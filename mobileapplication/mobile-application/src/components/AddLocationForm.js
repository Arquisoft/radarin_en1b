import React, { useEffect, useState } from "react";
import {
    addStringNoLocale,
    getSolidDataset,
    getSourceUrl,
    getThing,
    getUrlAll,
    saveSolidDatasetAt,
    setThing,
} from "@inrupt/solid-client";
import { useSession } from "@inrupt/solid-ui-react";
import { getOrCreateLocationList } from "../utils/index.js";

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
      if (!session) return;
      (async () => {
          //Obtenemos el dataset
          const profileDataset = await getSolidDataset(session.info.webId, {
              fetch: session.fetch,
          });

          //Obtenemos la "Thing" del perfil con la información del dataset
          const profileThing = getThing(profileDataset, session.info.webId);
          console.log(profileThing);
          //Conseguimos todos los URL de los POD del usuario, usando el estándar que le pasamos
          const podsUrls = getUrlAll(
              profileThing,
              STORAGE_PREDICATE
          );

          //Solo nos interesa el primer POD del usuario
          const pod = podsUrls[0];
          const containerUri = `${pod}public/locations/`; //Nombre de la carpeta, en el caso del ejemplo es Todos
          const list = await getOrCreateLocationList(containerUri, session.fetch);
          console.log(`Location list: ${list}`);
          setLocationList(list);
      })();
  }, [session]); //Le indicamos al useEffect que solo esté atento a la sesión

  const addLocation = async (text) => {
    const indexUrl = getSourceUrl(locationList);
    console.log("index " + indexUrl);
    const listaLoc = await getSolidDataset(indexUrl, { fetch: session.fetch });

    console.log("listaLoc " + listaLoc);
    
    const thing = getThing(listaLoc, indexUrl);
    console.log(thing);

    const locationWithText = addStringNoLocale(
        thing,
        "http://schema.org/text",
        text
    );
    const savedThing = setThing(locationList, locationWithText);

    const save = await saveSolidDatasetAt(indexUrl, savedThing, { fetch: session.fetch });
    setLocationList(save);
}

    const handleChangeName = (event) => {
      setValue(event.target.value);
      geolocateUser();
    };

    const handleChangeDescription = (event) => {
      setLocalizationDescription(event.target.value);
      geolocateUser();
    };
  
    const handleSubmit = (event) => {
      obtainUserLocation();
      alert('A new localization was added: ' + value);
      event.preventDefault();
    };

    const obtainUserLocation = () => {
      geolocateUser();
      //console.log("latitude = " + lati);
      //console.log("longitude = " + long);
      //console.log("name = " + value);
      //console.log("description = " + localizationDescription);
      addLocation(value + "%t" + localizationDescription + "%t" + lati + "%t" + long);
      resetState();
  };

  const resetState = () => {
    setValue("");
    setLocalizationDescription("");
  };

  const geolocateUser = () => {
    window.navigator.geolocation.getCurrentPosition((position) => {
      setLati(position.coords.latitude);
      setLong(position.coords.longitude);
      if (lati === 0 || long === 0) {
          setTimeout(geolocateUser, 1000);
      }
    }, console.log);
  };
      return (
        <div> 
            <form onSubmit={handleSubmit}>
                <label>Name of the location: 
                   <input type="text" value = {value} onChange={handleChangeName}/> 
                </label>
                <br/>
                <label>Description of the location:  
                   <input type="text" value = {localizationDescription} onChange={handleChangeDescription}/>
                </label>
                <br/>
                <button onClick={handleSubmit} variant="contained" color="primary" >Add new location</button>
           </form>
       </div>
    );
}
export default AddLocationForm;