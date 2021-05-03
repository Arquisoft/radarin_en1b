import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import user from "../static/user.svg";
import friend from "../static/friend.svg";
import "../css/Map.css";
import getFriendsWebIds from "../utils/solidAccessing/GetFriendsFromPod";
import { addUserOrUpdateLocation, getNearFriends, isBanned } from "../api/api";
import ReactDOM from "react-dom";
import Notification from "./Notification";
import loadingScreen from "../views/LoadingScreen";

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
            latitude: 0,
            longitude: 0,
            nearFriends: []
        };
        this.obtainLocations();
    }

    obtainLocations() {
        this.obtainUserLocation();
        setInterval(() => {
            this.obtainUserLocation();
        }, 30000);
    }

    obtainUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    this.setState({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });

                    await addUserOrUpdateLocation(this.props.session.info.webId, [position.coords.longitude, position.coords.latitude], await isBanned(this.props.session.info.webId));
                        
                    this.obtainFriendLocations();
                },
                (error) => {
                },{ enableHighAccuracy: true }
            );
        }
    }

    async obtainFriendLocations() {
        try {
            let friendsWebIds = await getFriendsWebIds(this.props.session);
            let nearFriends = await getNearFriends([this.state.longitude, this.state.latitude], friendsWebIds.map((friend) => friend.id));

            let notification = [];
            for (let near of nearFriends) {
                for (let friend of friendsWebIds) {
                    if (friend.id === near.webId) {
                        near.webId = friend.name;
                        break;
                    }
                }

                if (!notification.includes(near.webId)) {
                    notification.push(near.webId);
                }
            }

            let message = "";
            for (let i = 0; i < notification.length; i++) {
                message += notification[i];
                if (i !== notification.length - 1) {
                    message += ", ";
                }
            }

            if (this.state.render) {
                if (message !== "") {
                    ReactDOM.render(<Notification title={"You have friends nearby: "} message={message} icon="map" type='map' />, document.getElementById("notification-map"));
                } else {
                    ReactDOM.unmountComponentAtNode(document.getElementById("notification-map"));
                }
            }

            this.setState({
                nearFriends: nearFriends,
                render: true
            });
        } catch(error) {
            return;
        }
    }

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
    }

    render() {
        if (this.state.render) {
            let markers = this.retrieveMarkers();
            const coordinates = [this.state.latitude, this.state.longitude];
            return (<div className="map">
                <MapContainer center={coordinates} zoom={15} scrollWheelZoom={true} className="map">
                    <div id="notification-map" className='not'></div>
                    <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                    {markers.map((marker, i) => {
                        const markerPosition = [marker.location.coordinates[1], marker.location.coordinates[0]];
                        const updateMinutes = parseInt((new Date().getTime() - new Date(marker.lastUpdate).getTime()) / 60000)
                        return <Marker key = {i} position={markerPosition} icon={(i === markers.length - 1) ? userIcon : friendIcon}> 
                        <Popup>
                            <h1>{marker.webId}</h1>
                            <p>Updated {(updateMinutes === 0) ? "<1" : updateMinutes} min ago</p>
                        </Popup>
                        </Marker>; })}
                </MapContainer>
            </div>);
        } else {
            return loadingScreen("waiting-screen","We are looking for friends close to you...");
        }
    };

}
