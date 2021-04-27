import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useSelector, useDispatch } from 'react-redux';
import L from 'leaflet';
import marker from '../static/markerUser.svg';
import friendMarker from '../static/markerFriend.png';
import { getUserLocation, deleteLocation } from '../utils/locationsRedux/getLocationsSlice.js';
import { getFriends } from '../utils/friendsRedux/friendsSlice';
import { useSession } from '@inrupt/solid-ui-react/dist';
import removeUserLocation from '../utils/solidAccessing/RemoveLocations.js';
import { Button } from 'react-bootstrap';
import SyncLoader from "react-spinners/SyncLoader";
import { css } from "@emotion/core";
import '../css/Map.css';

const myIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor: [-0, -0],
    iconSize: [32, 45],
});

const iconPerson = new L.Icon({
    iconUrl: friendMarker,
    iconRetinaUrl: friendMarker,
    popupAnchor: [-0, -0],
    iconSize: [32, 45],
});

function MapComponent() {
    const [lati, setLati] = useState(0.0);
    const [long, setLong] = useState(0.0);
    const [render, setRender] = useState(false);
    const { session } = useSession();
    const dispatch = useDispatch();
    const totalLocations = useSelector((state) => state.locations.value);
    const statusLocations = useSelector((state) => state.locations.status);
    const errorLocations = useSelector((state) => state.locations.error);
    const statusFriends = useSelector((state) => state.friends.status);
    var locations = [];
    var markers = [];
    var friendMarkers = [];
    var loaded = false;
        

    useEffect(() => {
        if (statusFriends === "idle") {
            dispatch(getFriends(session));
        }else if (statusLocations === "idle" && statusFriends === "fulfilled") {
            dispatch(getUserLocation(session));
        }
    },[statusFriends, statusLocations, dispatch, session]);

    const renderMap = () => {
        return (<div>
                    <div id='loading' className="waiting-screen-map">
                        <h1 className="margin-right">Radarin Manager is computing your locations...</h1>
                        <SyncLoader  css={css`display: block;margin: 0 auto;border-color: red;`} size={40} color={"rgb(9, 71, 241)"} />
                    </div>
                    <div className="map">
                            <MapContainer center={[lati, long]} zoom={11} scrollWheelZoom={true} className="map">
                                <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                                {getMarkers()}
                                {getFriendMarkers()}
                                {checkStatus()}
                            </MapContainer>
                    </div>
                </div>);
    }

    const getMarkers = () =>{
        if (markers.length > 0){
            return markers.map((marker) => {
                const markerPosition = [marker.lat, marker.lng];
                return <Marker position={markerPosition} icon={myIcon}>
                            <Popup>
                                <h1>{marker.name}</h1>
                                <p>{marker.comment}</p>
                                <Button className='center-button' onClick={(() => {
                                    removeUserLocation(session, marker);
                                    dispatch(
                                        deleteLocation(marker)
                                    );
                                })}>
                                    Remove location
                                </Button>
                            </Popup>
                        </Marker>
            })
        }
    }

    const getFriendMarkers = () => {
        if (friendMarkers.length > 0){
            return friendMarkers.map((friendMarker) => {
                const markerPosition = [friendMarker.lat, friendMarker.lng];
                return (<Marker position={markerPosition} icon={iconPerson}>
                    <Popup>
                        <h1>{friendMarker.author} Location:</h1>
                        <h1>{friendMarker.name}</h1>
                        <p>{friendMarker.comment}</p>
                    </Popup>
                </Marker>)
            });
        }
    }
    
    const checkStatus = () => {
        if (loaded){
            var loading = document.getElementById("loading");
            if (loading !== null){
                loading.remove();
            }
        }
    }

    if (statusLocations === "rejected") {
        return <div>{errorLocations}</div>
    } else if (statusLocations === "fulfilled") {
        locations = parseLocations(totalLocations, session);
        markers = locations[0];
        friendMarkers = locations[1];
        loaded = true;
    }

    if (render === true){
        return renderMap();
    }else{
        window.navigator.geolocation.getCurrentPosition((position) => {
            setLati(position.coords.latitude);
            setLong(position.coords.longitude);
            setRender(true);
        });
    }

    return <div className="waiting-screen">
                <h1>Radarin Manager is computing your locations... </h1>
                <SyncLoader css={css`display: block;margin: 0 auto;border-color: red;`} size={40} color={"rgb(9, 71, 241)"} />
           </div>;
}
export default MapComponent;

function parseLocations(totalLocations, session) {
    let toRet = [];
    let friendsLocations = [];
    totalLocations.forEach((info) => {
        if (info.id === session.info.webId) {
            let markers = [];
            info.localizaciones.forEach((location) => {
                markers.push(location);
            });
            toRet.push(markers);
        } else {
            info.localizaciones.forEach((location) => {
                friendsLocations.push({
                    author: info.name,
                    name: location.name,
                    comment: location.comment,
                    lat: location.lat,
                    lng: location.lng,
                });
            });
        }
    });
    toRet.push(friendsLocations);

    return toRet;
}

 
