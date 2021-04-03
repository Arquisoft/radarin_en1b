
import MapComponent from '../Map'
//import { FOAF } from "@inrupt/lit-generated-vocab-common";
import { useSession } from "@inrupt/solid-ui-react";


const MainView = () => {

   const { session } = useSession();
   // const name =   await data[session.info.webId].name;
    return (
            <div className="App">
            <h1>Radarin map preliminary version</h1>
        <MapComponent />
        </div>
    );
}


export default MainView;
