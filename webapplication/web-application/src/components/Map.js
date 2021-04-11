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
    const dispatch = useDispatch();
    const { session } = useSession();
    let content;

    const totalLocations = useSelector((state) => state.locations.value);
    const statusLocations = useSelector((state) => state.locations.status);
    const errorLocations = useSelector((state) => state.locations.error);

    const totalFriends = useSelector((state) => state.friends.value);
    const statusFriends = useSelector((state) => state.friends.status);

    window.navigator.geolocation.getCurrentPosition((position) => {
        setLati(position.coords.latitude);
        setLong(position.coords.longitude);
    });


    useEffect(() => {
        if (statusFriends === "idle") {
            dispatch(
                getFriends(session)
            );
        }
        else if (statusLocations === "idle" && statusFriends === "fulfilled") {
            dispatch(getUserLocation(session));
            console.log('Entro otra vez');
        }
    }, [statusLocations, statusFriends]);


    if (statusLocations === "pending" || statusLocations === "idle") {
        content = <div className="waiting-screen">Radarín is computing your locations....</div>
    } else if (statusLocations === "rejected") {
        content = <div>{errorLocations}</div>
    } else if (statusLocations === "fulfilled") {

        let locations = parseLocations(totalLocations, session);
        let markers = locations[0];
        let friendMarkers = locations[1];

        content = (
            <div className="map-area">

                <MapContainer center={[lati, long]} zoom={11} scrollWheelZoom={true}>
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
                        return <Marker position={markerPosition} icon={iconPerson}>
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