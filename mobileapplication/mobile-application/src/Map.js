import React, { Component } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import marker from './static/radar.svg';
import AddLocationForm from './AddLocationForm';
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
        this.lati = 43.4683239;
        this.long = -5.6941612;
        this.state = {
            render: false, //Set render state to false
            latitude: this.lati, //Added in the state to rerender the component
            longitude: this.long
        }
        this.obtainLocations();
    }

    refreshView() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                    position => {
                        this.lati = position.coords.latitude;
                        this.long = position.coords.longitude;       
                    },
                    error => {
                        console.log("Error: ", error)
                    },{ enableHighAccuracy: true });
        }
    }

    obtainLocations() {
        setInterval(() => {
            this.obtainUserLocation();
            this.obtainFriendLocations();
        }, 1000);
    }

    obtainUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                    position => {
                        let latitude = position.coords.latitude;
                        let longitude = position.coords.longitude;
                        console.log("lat" + latitude);
                        console.log("long" + longitude);
                        this.setState({
                            latitude: latitude,
                            longitude: longitude
                        })                                             

                    },
                    error => {
                        console.log("Error: ", error)
                    },{ enableHighAccuracy: true });
    }
}


    obtainFriendLocations() {
        //TODO
    }


    retrieveMarkers() {
        //TODO
        //In this function we are going to query the pods and retrieve a user's coordinates
        return [
            {
                name: "Your location",
                comment: "Users' current location",
                lat: this.state.latitude,
                lng: this.state.longitude
            }
        ];
    }

    componentDidMount() {
        setTimeout(function() { //Start the timer
            this.setState({render: true}) //0.5 second, set render to true
        }.bind(this), 500)
    }

    render() {
        if (this.state.render){
        var markers = this.retrieveMarkers();
        const coordinates = [this.state.latitude, this.state.longitude];
        return (
            <div className="map-area">

                <MapContainer center={coordinates} zoom={10} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {markers.map((marker) => {
                        const markerPosition = [marker.lat, marker.lng];
                        return <Marker key = {marker.name} position={markerPosition} icon={myIcon}> 
                        <Popup>
                            <h1>{marker.name}</h1>
                            <p>{marker.comment}</p>
                        </Popup>
                        </Marker> })}
                    
                    
                </MapContainer>
                <AddLocationForm />

            </div>
        );
        }else{
            return null;
        }

    }
    
}

