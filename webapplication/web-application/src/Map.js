import React, { Component } from 'React'
import { Map, GoogleApiWrapper } from 'google-maps-react';

export class MapComponent extends Component {

    render() {

        const markers = retrieveMarkers();

        return (<div className="map-area">

                <Map

                    google={this.props.google}

                    zoom={14}

                    center={{

                        lat: 43.25018525761058,

                        lng: -5.782307057287958

                    }}>
                    
                    {markers.map((marker)=>{
                        return <Marker key={marker.name}

                        icon={{
                    
                            url: 'https://www.flaticon.es/svg/vstatic/svg/4251/4251474.svg?token=exp=1614709424~hmac=4681d68d572f32c965509523f8cd338f',
                    
                            anchor: new google.maps.Point(17, 46),
                    
                            scaledSize: new google.maps.Size(37, 37)
                    
                        }}
                    
                        position={{
                    
                            lat: marker.lat,
                    
                            lng: marker.lng
                    
                        }}
                    
                        onClick={() => this.openinfo(marker)}
                        />
                     })}

                </Map>

            </div>);

    }

    openinfo(marker) {
        //display the marker information
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
}

export default GoogleApiWrapper({

    apiKey: ("AIzaSyBSuJOh_jsU3BGuOip776L9RW-XZGU8Dsk")

})(MapComponent);
 