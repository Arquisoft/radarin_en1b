import React, { Component } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import marker from './static/radar.svg';
import './css/Map.css'
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
        this.lati = 0;
        this.long = 0;
        window.navigator.geolocation.getCurrentPosition((position) => {
            this.lati = position.coords.latitude;
            this.long = position.coords.longitude;
            this.theComponentDidMount();
        }, console.log);
        this.state = {
            render: false //Set render state to false
        }
        console.log(this.lati);
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

    theComponentDidMount() {
        setTimeout(function() { //Start the timer
            this.setState({render: true}) //0.1 second, set render to true
        }.bind(this),1)
    }

    render() {
        if (this.state.render){
        var markers = this.retrieveMarkers();
        const coordinates = [this.lati, this.long];
        return (
            <div className="map">

                <MapContainer center={coordinates} zoom={11} scrollWheelZoom={true} className="map">
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
                    
                    
                </MapContainer>

            </div>
        );
        }else{
            return null;
        }

    }
    
}

