import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useSelector, useDispatch } from 'react-redux';
import L from 'leaflet';
import marker from '../static/markerUser.svg';
import friendMarker from '../static/markerFriend.png';
import { getUserLocation, deleteLocation } from '../utils/locationsRedux/getLocationsSlice.js';
import { getFriends } from '../utils/friendsRedux/friendsSlice';
import { useSession } from '@inrupt/solid-ui-react/dist';
import removeUserLocation from '../utils/solidAccessing/RemoveLocations.js';
import '../css/Map.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Button } from 'react-bootstrap';

const myIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor: [-0, -0],
    iconSize: [32, 45],
});

const iconPerson = new L.Icon({
    iconUrl: friendMarker,
    iconRetinaUrl: friendMarker,
    popupAnchor: [-0, -0],
    iconSize: [32, 45],
});


function MapComponent() {
    const [lati, setLati] = useState(0.0);
    const [long, setLong] = useState(0.0);
    const [render, setRender] = useState(false);
    const[locationFound,setLocationFound] = useState(false);
    const [progress, setProgress] = useState(0);
    const dispatch = useDispatch();
    const { session } = useSession();
    let content;

    const totalLocations = useSelector((state) => state.locations.value);
    const statusLocations = useSelector((state) => state.locations.status);
    const errorLocations = useSelector((state) => state.locations.error);

    const statusFriends = useSelector((state) => state.friends.status);

    useEffect(() => {
        if (statusFriends === "idle") {
            dispatch(
                getFriends(session)
            );
            setProgress(progress => progress + 20);
        }else if (statusLocations === "pending") {
            setProgress(progress => progress + 20);
        } else if (statusLocations === "idle" && statusFriends === "fulfilled") {
            dispatch(getUserLocation(session));
            setProgress(progress => progress + 20);
        }else if(statusFriends === "fulfilled"){
            setProgress(progress => progress + 20);
        }else if (statusLocations === "idle"){
            setProgress(progress => progress + 20);
        }
    },[statusFriends, statusLocations, dispatch, session]);

    if (locationFound === false){
        window.navigator.geolocation.getCurrentPosition((position) => {
            setLati(position.coords.latitude);
            setLong(position.coords.longitude);
            setRender(true);
            setLocationFound(true);
        });
    }

    if (statusLocations === "pending" || statusLocations === "idle") {
        
        content = <div className="waiting-screen">
                    <h1>Radarin Manager is computing your locations...</h1>
                    <br/>
                    {CircularStatic(progress)}
                  </div>;
    } else if (statusLocations === "rejected") {
        content = <div>{errorLocations}</div>
    } else if (statusLocations === "fulfilled" && render === true) {

        let locations = parseLocations(totalLocations, session);
        let markers = locations[0];
        let friendMarkers = locations[1];

        content = (
            <div id='map' className="map">

                <MapContainer center={[lati, long]} zoom={11} scrollWheelZoom={true} className="map">
                    <div id='notification-map'></div>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {markers.map((marker) => {
                        const markerPosition = [marker.lat, marker.lng];
                        return <Marker position={markerPosition} icon={myIcon} >
                            <Popup>
                                <h1>{marker.name}</h1>
                                <p>{marker.comment}</p>
                                <Button className='center-button' onClick={(() => {
                                    removeUserLocation(session, marker);
                                    dispatch(
                                        deleteLocation(marker)
                                    );
                                    })}>Remove location</Button>
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

                </MapContainer>

            </div>
        );
    }else{
        content = <div className="waiting-screen">
        <h1>Radarin Manager is computing your locations...</h1>
      </div>;
    }
    return <div className="map">{content}</div>;
}
export default MapComponent;

 function CircularStatic(progress) {
    return <CircularProgressWithLabel value={progress} />;
}

function CircularProgressWithLabel(props) {
    return (
      <Box position="relative" display="inline-flex">
        <CircularProgress size={150} variant="determinate" {...props} />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
          
        >
          <Typography variant="caption" component="div">{`${Math.round(props.value,)}%`}</Typography>
        </Box>
      </Box>
    );
  }

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