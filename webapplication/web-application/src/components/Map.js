import React, { Component, useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useSelector, useDispatch } from 'react-redux';
import L from 'leaflet';
import marker from '../static/radar.svg';
import personMarker from '../static/person.svg';
import { getUserLocation } from '../utils/locationsRedux/locationsSlice';
import { getFriends } from '../utils/friendsRedux/friendsSlice';
import { useSession } from '@inrupt/solid-ui-react/dist';

const myIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor: [-0, -0],
    iconSize: [32, 45],
});

const iconPerson = new L.Icon({
    iconUrl: personMarker,
    iconRetinaUrl: personMarker,
    popupAnchor: [-0, -0],
    iconSize: [32, 45],
});

function MapComponent() {
    const [render, setRender] = useState(false);
    const [lati, setLati] = useState(0.0);
    const [long, setLong] = useState(0.0);
    const [markers, setMarkers] = useState([]);
    const [friendMarkers, setFriendMarkers] = useState([]);
    const dispatch = useDispatch();
    const { session } = useSession();
    let content;

    const totalLocations = useSelector((state) => state.locations.value);
    console.log(totalLocations);
    const statusLocations = useSelector((state) => state.locations.status);
    const errorLocations = useSelector((state) => state.locations.error);

    const totalFriends = useSelector((state) => state.friends.value);
    const statusFriends = useSelector((state) => state.friends.status);

    useEffect(() => {
        if(statusFriends === "idle"){
            dispatch(
                getFriends(session)
            );
        }
        if (statusLocations === "idle" && statusFriends === "fulfilled") {
           dispatch(getUserLocation(session));
        }
    });


    if (statusLocations === "pending" || statusLocations === "idle") {
        content = <div className="waiting-screen">Radarín is computing your locations....</div>
    } else if (statusLocations === "rejected") {
        content = <div>{errorLocations}</div>
    } else if (statusLocations === "fulfilled") {
        window.navigator.geolocation.getCurrentPosition((position) => {
            setLati(position.coords.latitude);
            setLong(position.coords.longitude);
        });

        const coordinates = [lati, long];
        
        let friendsLocations = [];

        totalLocations.forEach((info) => {
            if(info.id === session.info.webId) {
                let markers = [];
                info.locations.forEach((location) =>{
                    markers.push(location);
                });
                setMarkers(markers);
            } else {
                info.locations.forEach((location) => {
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

        setFriendMarkers(friendsLocations);

        content = (
            <div className="map-area">

                <MapContainer center={coordinates} zoom={11} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {markers.map((marker) => {
                        const markerPosition = [marker.lat, marker.lng];
                        return <Marker position={markerPosition} icon={myIcon}>
                            <Popup>
                                <h1>{marker.name}</h1>
                                <p>{marker.comment}</p>
                            </Popup>
                        </Marker>
                    })}

                    {friendMarkers.map((friendMarker) => {
                        const markerPosition = [friendMarker.lat, friendMarker.lng];
                        return <Marker position={markerPosition} icon={myIcon}>
                            <Popup>
                                <h1>{friendMarker.author} Location:</h1>
                                <h1>{friendMarker.name}</h1>
                                <p>{friendMarker.comment}</p>
                            </Popup>
                        </Marker>
                    })}

                </MapContainer>,

            </div>
        );
    }
    return <div>{content}</div>;
}
export default MapComponent;