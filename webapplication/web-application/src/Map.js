import React, { Component } from 'react'
import { Map, GoogleApiWrapper,Marker} from 'google-maps-react';

export class MapComponent extends Component {
        constructor(){
            super();
            navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this));
        }
    
        getPosicion(posicion){
            this.long= posicion.coords.longitude; 
            this.lat= posicion.coords.latitude;  
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

    render() {
        var markers = this.retrieveMarkers();

        
        return (<div className="map-area">

                <Map
                    center={{

                        lat: this.lat,

                        lng: this.long

                    }}
                    centerAroundCurrentLocation={true}
                    
                    google={this.props.google}
                    zoom={11}
                    
                    >
                    <Marker 
                        position={{
                    
                            lat: 43.364739393028024,
                            lng: -5.8507182415799575
                    
                        }}
                        title={"La capital de Asturias!"}
                        >
                    </Marker>

                    <Marker 
                        position={{
                    
                            lat: 43.545142258113735,
                            lng: -5.662559315448055
                    
                        }}
                        title={"Una ciudad preciosa!"}
                        >
                    </Marker>
                    
                    <Marker 
                        position={{
                    
                            lat: 43.56040003876269,
                            lng: -5.924200713062158
                    
                        }}
                        title={"Una zona muy industrial!"}
                        >
                    </Marker>
                    
                </Map>

            </div>);
            
    }
}

export default GoogleApiWrapper({

    apiKey: ("AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU")
    
    //AIzaSyBSuJOh_jsU3BGuOip776L9RW-XZGU8Dsk

})(MapComponent);
 