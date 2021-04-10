import React, { Component, useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useSelector, useDispatch} from 'react-redux';
import L from 'leaflet';
import marker from '../static/radar.svg';

const myIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor:  [-0, -0],
    iconSize: [32,45],     
});

function MapComponent() {
    const [render, setRender] = useState(false);
    const [lati, setLati] = useState(0.0);
    const [long, setLong] = useState(0.0);
    const [markers, setMarkers] = useState([]);
    const [friendMarkers, setFriendMarkers] = useState([]);

    window.navigator.geolocation.getCurrentPosition((position) => {
        setLati(position.coords.latitude);
        setLong(position.coords.longitude);
        theComponentDidMount();
    }, console.log);
    
    const theComponentDidMount = () => {
        setTimeout(function() { //Start the timer
           setRender(true); //0.5 second, set render to true
        }.bind(this), 500)
    }

    const totalLocations = useSelector((state) => state.locations.value);

    const parseUserCoordinates = () => {
        
        const userLocations = totalLocations[0];

        const parsedMarkers = [];

        userLocations.forEach(location => {
            const parsedLocation = location.split('%t');

            parsedMarkers.push({
                name: parsedLocation[0],
                comment: parsedLocation[1],
                lat: parsedLocation[2],
                lng: parsedLocation[3]
            });
        });

        setMarkers(parsedMarkers);
    };


    const parseFriendCoordinates = () => {
        
        const friendLocations = totalLocations[1];

        const parsedMarkers = [];
        friendLocations.forEach(friendSave => {
            const parsedFriendMarkers = [];

            friendSave.forEach(friendLocation => {
                const parsedFriendLocation = friendLocation.split('%');

                parsedFriendMarkers.push({
                    name: parsedFriendLocation[0],
                    comment: parsedFriendLocation[1],
                    lat: parsedFriendLocation[2],
                    lng: parsedFriendLocation[3]
                });
            });

            parsedMarkers.push(parsedFriendMarkers);
        });
        setFriendMarkers(parsedMarkers);
    };

    const show = () => {
        if (render){
            const coordinates = [lati, long];
            parseUserCoordinates();
            parseFriendCoordinates();
            return (
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
                            </Marker> })}
                        
                        {friendMarkers.map((marker) => {
                            const markerPosition = [marker.lat, marker.lng];
                            return <Marker position={markerPosition} icon={myIcon}> 
                            <Popup>
                                <h1>Friends Location:</h1>
                                <h1>{marker.name}</h1>
                                <p>{marker.comment}</p>
                            </Popup>
                            </Marker> })}
                        
                    </MapContainer>,

                </div>
            );
        } else {
            return null;
        }
    }

    return show();
}

export default MapComponent;