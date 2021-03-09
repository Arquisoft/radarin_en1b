import React, { Component } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export default class MapComponent extends Component {
    state = {
        locationDisplayed: false
    };

    constructor() {
        super();
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this));
    }

    getPosicion(position) {
        this.latitude  = position.coords.latitude;
        this.longitude = position.coords.longitude;
    }

    retrieveMarkers() {
        //TODO
        //In this function we are going to query the pods and retrieve a user's coordinates
        return [
            {
                name: "Oviedo",
                comment: "La capital de Asturias!",
                lat: 43.364739393028024,
                lng: -5.8507182415799575
            },

            {
                name: "Gijón",
                comment: "Una ciudad preciosa!",
                lat: 43.545142258113735,
                lng: -5.662559315448055
            },

            { //Avilés
                name: "Avilés",
                comment: "...",
                lat: 43.56040003876269,
                lng: -5.924200713062158
            }
        ];
    }

    render() {
        var markers = this.retrieveMarkers();
        const position = [parseFloat(this.latitude), parseFloat(this.longitude)];

        return (
            <div className="map-area">

                <MapContainer center={position} zoom={11} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {markers.map((marker) => {
                        const markerPosition = [parseFloat(marker.lat), parseFloat(marker.lng)];
                        return <Marker position={markerPosition}>
                        <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                        </Marker> })}
                    
                    
                </MapContainer>,

            </div>
        );

    }
}
