import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserLocation} from "../utils/locationsRedux/getLocationsSlice.js";
import { getFriends } from "../utils/friendsRedux/friendsSlice";
import { useSession } from "@inrupt/solid-ui-react/dist";
import "../css/Map.css";
import map from "../components/Map";
import parseLocations from "../components/ParseLocations.js";
import loadingScreen from "./LoadingScreen";

function MapComponent() {
    const [lati, setLati] = useState(0);
    const [long, setLong] = useState(0);
    const [show, setShow] = useState(false);
    const { session } = useSession();
    const dispatch = useDispatch();
    const totalLocations = useSelector((state) => state.locations.value);
    const statusLocations = useSelector((state) => state.locations.status);
    const errorLocations = useSelector((state) => state.locations.error);
    const statusFriends = useSelector((state) => state.friends.status);
    var locations = [];
    var markers = [];
    var friendMarkers = [];

    useEffect(() => {
        if (statusFriends === "idle") {
            dispatch(getFriends(session));
        }else if (statusLocations === "idle" && statusFriends === "fulfilled") {
            dispatch(getUserLocation(session));
        }
    },[statusFriends, statusLocations, dispatch, session]);

    if( !show ){
        window.navigator.geolocation.getCurrentPosition((position) => {setLati(position.coords.latitude);setLong(position.coords.longitude); setShow(true);}); 
    } 

    if (statusLocations === "rejected") {
        return <div>{errorLocations}</div>;
    } else if (statusLocations === "fulfilled" && show) {
        locations = parseLocations(totalLocations, session.info.webId);
        markers = locations[0];
        friendMarkers = locations[1];
        return map(lati,long,markers,friendMarkers,session,dispatch);
    }else{
        return loadingScreen("waiting-screen","We are searching for favourite locations...");
    }
}
export default MapComponent;