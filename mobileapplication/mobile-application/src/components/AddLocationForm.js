import React, { useEffect, useState } from "react";
import {
    addStringNoLocale,
    getSolidDataset,
    getSourceUrl,
    getThing,
    getUrlAll,
    saveSolidDatasetAt,
    setThing,
    createThing
} from "@inrupt/solid-client";
import { useSession } from "@inrupt/solid-ui-react";
import { getOrCreateLocationList } from "../utils/index.js";
import { Input } from "@material-ui/core";
import { Button } from "react-bootstrap";
import Notification from "./Notification.js";
import ReactDOM from "react-dom";

const STORAGE_PREDICATE = "http://www.w3.org/ns/pim/space#storage";

function AddLocationForm() {

  const { session } = useSession();
  const [locationList, setLocationList] = useState();

  const [lati, setLati] = useState(0);
  const [long, setLong] = useState(0);
  const [value, setValue] = useState("");
  const [localizationDescription, setLocalizationDescription] = useState("");



  /**
   * Con useEffect, le estamos diciendo a react que
   * queremos que el componente haga algo después de
   * ser renderizado.
   * Guardará la función que le pasemos para llamarla 
   * después de actualizar el DOM.
   */
  useEffect(() => {
    if (!session) {return;}
    (async () => {
        //Obtenemos el dataset
        const profileDataset = await getSolidDataset(session.info.webId, {
            fetch: session.fetch
        });

        //Obtenemos la "Thing" del perfil con la información del dataset
        const profileThing = getThing(profileDataset, session.info.webId);
        //Conseguimos todos los URL de los POD del usuario, usando el estándar que le pasamos
        const podsUrls = getUrlAll(
            profileThing,
            STORAGE_PREDICATE
        );

        //Solo nos interesa el primer POD del usuario
        const pod = podsUrls[0];
        const containerUri = `${pod}public/locations/`; //Nombre de la carpeta, en el caso del ejemplo es Todos
        const list = await getOrCreateLocationList(containerUri, session.fetch);
        setLocationList(list);
    })();
  }, [session]); //Le indicamos al useEffect que solo esté atento a la sesión

  const addLocation = async (text) => {
    
    const indexUrl = getSourceUrl(locationList);
    const listaLoc = await getSolidDataset(indexUrl, { fetch: session.fetch });

    let thing = getThing(listaLoc, indexUrl);

    if(thing == null) {
      thing = createThing(listaLoc, indexUrl);
    }
    const newThing = addStringNoLocale(
        thing,
        "http://schema.org/text",
        text
    );

    const savedThing = setThing(locationList, newThing);

    const save = await saveSolidDatasetAt(indexUrl, savedThing, { fetch: session.fetch });
    
    setLocationList(save);
  };

  const resetState = () => {
    setValue("");
    setLocalizationDescription("");
  };

  const handleSubmit = (event) => {
    window.navigator.geolocation.getCurrentPosition((position) => {
      setLati(position.coords.latitude);
      setLong(position.coords.longitude);
      
      addLocation(value + "%t" + localizationDescription + "%t" + position.coords.latitude + "%t" + position.coords.longitude);
      resetState();

      showNotification(true, event);
    }, (error) => {
      showNotification(false, event);
    },{ enableHighAccuracy: true });
  };

  const showNotification = (added, event) => {
    let notificacion = <Notification title={"New location could not be added"} message="" icon="locationNotAdded"/>;
    if (added) {
      notificacion = <Notification title={"New location was added!"} message="" icon="locationAdded"/>;
    }

    ReactDOM.render(notificacion, document.getElementById("not"));
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(document.getElementById("not"));
    }, 6000);
    event.preventDefault();
  };

  const handleChangeDescription = (event) => {
    setLocalizationDescription(event.target.value);
  };

  const handleChangeName = (event) => {
    setValue(event.target.value);
  };

  return (<div>
      <div id='not' className='no'></div>
      <div id='cont' className='waiting-screen-2 card-welcome-2'> 
          <form>
              <br/>
              <label>Name of the location: 
                <br/>
                <Input className='marginleft' type="text" value = {value} onChange={handleChangeName}/> 
              </label>
              <br/>
              <br/>
              <br/>
              <label>Description of the location:
              <br/>
                <Input className='marginleft' type="text" value = {localizationDescription} onChange={handleChangeDescription}/>
              </label>
              <br/>
              <br/>
              <Button onClick={handleSubmit} variant="contained" color="primary" className='button'>Add new location</Button>
              
          </form>
      </div>
    </div>
  );
}
export default AddLocationForm;