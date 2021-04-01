import React, { Component } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import marker from './static/radar.svg';
import AddLocations from '../src/utils/AddLocations.js';
import ObtainLocations from '../src/utils/GetLocations.js';

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

    theComponentDidMount() {
        setTimeout(function() { //Start the timer
            this.setState({render: true}) //0.5 second, set render to true
        }.bind(this), 500)
    }

    parseCoordinates(coordinates) {
        let parsedLocalizations = [];
        coordinates.array.forEach(element => {
            let splitted = element.split("%");
            let localizationObj = {name: splitted[0], comment: splitted[1], lat: splitted[2], lng: splitted[3]};

            parsedLocalizations.push(localizationObj);
        });
    }

    render() {
        if (this.state.render){
        var markers = this.parseCoordinates(this.props.locations);
        const coordinates = [this.lati, this.long];
        return (
            <div className="map-area">

                <MapContainer center={this.parseCoordinates(this.props.locations)} zoom={11} scrollWheelZoom={true}>
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
        }else{
            return null;
        }

    }
    
}

