import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import user from '../static/user.svg';
import friend from '../static/friend.svg';
import '../css/Map.css'
import getFriendsWebIds from '../utils/solidAccessing/GetFriendsFromPod';
import { addUserOrUpdateLocation, getNearFriends } from '../api/api';
import { css } from "@emotion/core";
import SyncLoader from "react-spinners/SyncLoader";
import Notification from './Notification';

const userIcon = new L.Icon({
    iconUrl: user,
    iconRetinaUrl: user,
    popupAnchor:  [-0, -0],
    iconSize: [32,45],     
});
const friendIcon = new L.Icon({
    iconUrl: friend,
    iconRetinaUrl: friend,
    popupAnchor:  [-0, -0],
    iconSize: [32,45],     
});

export default class MapComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            render: false,
            latitude: 0.0,
            longitude: 0.0,
            friendsWebIds: [],
            nearFriends: [],
            pastNearFriends: []
        }
        this.obtainLocations();
    };

    obtainLocations() {
        this.obtainUserLocation();
        setInterval(() => {
            this.obtainUserLocation();
        }, 30000);
    };

    obtainUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async position => {
                    this.setState({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });

                    let response = await addUserOrUpdateLocation(this.props.session.info.webId, [this.state.longitude, this.state.latitude]);
                    if (response.error)
                        console.log("Error adding user location to restapi. Is it on?");

                    this.obtainFriendLocations();
                },
                error => {
                    console.log("Error: ", error);
                },{ enableHighAccuracy: true }
            );
        }
    };

    async obtainFriendLocations() {
        try {
            let friendsWebIds = await getFriendsWebIds(this.props.session);
            let nearFriends = await getNearFriends([this.state.longitude, this.state.latitude], friendsWebIds.map(friend => friend.id));

            for (let near of nearFriends) {
                for (let friend of friendsWebIds) {
                    if (friend.id === near.webId) {
                        near.webId = friend.name;
                        break;
                    }
                }
            }

            if (nearFriends.length > 0) {
                for (let near of nearFriends) {
                    if(!this.state.pastNearFriends.includes(near)){
                        <Notification title='A friend is nearby:' message={near.webId} icon='map'/>
                    }
                }
                this.setState({pastNearFriends: nearFriends});
            }

            this.setState({
                friendsWebIds: friendsWebIds,
                nearFriends: nearFriends,
                render: true
            });
        } catch(error) {
        };
    };

    retrieveMarkers() {
        let markers = this.state.nearFriends;
        markers.push({
            webId: "Your location",
            location: {
                coordinates: [this.state.longitude, this.state.latitude]
            },
            lastUpdate: new Date().toISOString()
        });
        return markers;
    };

    render() {
        if (this.state.render) {
            let markers = this.retrieveMarkers();
            const coordinates = [this.state.latitude, this.state.longitude];
            return (<div className="map">
                <MapContainer center={coordinates} zoom={15} scrollWheelZoom={true} className="map">
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {markers.map((marker, i) => {
                        const markerPosition = [marker.location.coordinates[1], marker.location.coordinates[0]];
                        return <Marker key = {i} position={markerPosition} icon={(i === markers.length - 1) ? userIcon : friendIcon}> 
                        <Popup>
                            <h1>{marker.webId}</h1>
                            <p>Updated at {marker.lastUpdate}</p>
                        </Popup>
                        </Marker> })}
                </MapContainer>
            </div>);
        } else {
            const override = css`
            display: block;
            margin: 0 auto;
            border-color: red;
            `;
            return <div className="waiting-screen">
                        <h1>Radarin Radar is computing the locations...</h1>
                        <SyncLoader css={override} size={25} color={"rgb(236, 63, 78)"} />
                    </div>;
        }
    };

};
