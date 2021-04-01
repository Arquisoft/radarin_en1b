
import MapComponent from '../Map'
//import { FOAF } from "@inrupt/lit-generated-vocab-common";
import { useRef , Component, useEffect} from 'react';
import { useSession } from "@inrupt/solid-ui-react";


function MainView({ locations }) {

    const { session } = useSession();
    // const name =   await data[session.info.webId].name;
    console.log(locations);
    return (
        <div className="App">
            <h1>Radarin map preliminary version</h1>
           
        <MapComponent locations={locations}/>
        </div>
    );
}


export default MainView;
