import React, { Component } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import marker from './static/radar.svg';
const myIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor:  [-0, -0],
    iconSize: [32,45],     
});

export default class MapComponent extends Component {
    state = {
        locationDisplayed: false
    };

    constructor() {
        super();
        this.latitude = "";
        this.longitude = "";
        window.navigator.geolocation.getCurrentPosition((position) => {
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
        }, console.log);
        console.log(this.latitude);
    }

    retrieveMarkers() {
        //TODO
        //In this function we are going to query the pods and retrieve a user's coordinates
        return [
            {
                name: "Oviedo",
                comment: "La capital de Asturias!",
                lat: "43.364739393028024",
                lng: "-5.8507182415799575"
            },

            {
                name: "Gijón",
                comment: "Una ciudad preciosa!",
                lat: "43.545142258113735",
                lng: "-5.662559315448055"
            },

            { //Avilés
                name: "Avilés",
                comment: "...",
                lat: "43.56040003876269",
                lng: "-5.924200713062158"
            }
        ];
    }

    render() {
        var markers = this.retrieveMarkers();
        const coordinates = [this.latitude, this.longitude];
        console.log(coordinates);
        return (
            <div className="map-area">

                <MapContainer center={["43.545142258113735", "-5.924200713062158"]} zoom={11} scrollWheelZoom={true}>
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
                    
                    
                </MapContainer>,

            </div>
        );

    }
}
