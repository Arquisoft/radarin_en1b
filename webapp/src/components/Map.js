import { Button } from "react-bootstrap";
import { deleteLocation } from "../utils/locationsRedux/getLocationsSlice";
import removeUserLocation from "../utils/solidAccessing/RemoveLocations";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import marker from "../static/markerUser.svg";
import friendMarker from "../static/markerFriend.png";
import '../css/Map.css';
 
export default function map(latii,longi,markersi,friendMarkersi,sessioni,dispatch){
    const lati = latii;
    const long = longi;
    const markers = markersi;
    const friendMarkers = friendMarkersi;
    const session = sessioni;

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
    
    const getMarkers = () => {
        if (markers.length > 0){
            return markers.map((marker,index) => {
                const markerPosition = [marker.lat, marker.lng];
                return <Marker data-testid={"marker "+index} position={markerPosition} icon={myIcon}>
                            <Popup>
                                <h1>{marker.name}</h1>
                                <p>{marker.comment}</p>
                                <div className='center-button'>
                                    <Button data-testid='button' onClick={(() => {
                                        removeUserLocation(session, marker);
                                        dispatch(
                                            deleteLocation(marker)
                                        );
                                    })}>
                                        Remove
                                    </Button>
                                </div>
                            </Popup>
                        </Marker>;
            });
        }
    };

    const getFriendMarkers = () => {
        if (friendMarkers.length > 0){
            return friendMarkers.map((friendMarker,index) => {
                const markerPosition = [friendMarker.lat, friendMarker.lng];
                return (<Marker data-testid={"markerFriend "+index} position={markerPosition} icon={iconPerson}>
                    <Popup>
                        <h1>{friendMarker.name}</h1>
                        <p>{friendMarker.comment}</p>
                        <div className='center-button'>
                            <Button disabled data-testid='button'>
                                {friendMarker.author}
                            </Button>
                        </div>
                    </Popup>
                </Marker>);
            });
        }
    };

    return (
            <div className="map">
                <div id='notification-map' className='notif'></div>
                    <MapContainer center={[lati, long]} zoom={11} scrollWheelZoom={true} className="map">
                        <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                        {getMarkers()}
                        {getFriendMarkers()}
                    </MapContainer>
            </div>
           );
    
}


