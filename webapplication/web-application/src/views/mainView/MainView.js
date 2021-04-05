
import MapComponent from '../../components/Map';
//import { FOAF } from "@inrupt/lit-generated-vocab-common";
import { useSession } from "@inrupt/solid-ui-react";
import Navbar from "../navbar/Navbar";


const MainView = props => {

   const { session } = useSession();
   // const name =   await data[session.info.webId].name;

    return (
        <div className="App">
            <Navbar />
            <MapComponent />
        </div>
    );
}


export default MainView;
