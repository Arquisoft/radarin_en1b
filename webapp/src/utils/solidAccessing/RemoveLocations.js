import {
    removeStringNoLocale,
    getSolidDataset,
    getSourceUrl,
    getThing,
    setThing,
    getUrlAll,
    saveSolidDatasetAt
} from "@inrupt/solid-client";
import { getOrCreateLocationList } from "./indexRemove.js";

const STORAGE_PREDICATE = "http://www.w3.org/ns/pim/space#storage";

export default async function removeUserLocation(session, location) { 
    /**
     * Con useEffect, le estamos diciendo a react que
     * queremos que el componente haga algo después de
     * ser renderizado.
     * Guardará la función que le pasemos para llamarla 
     * después de actualizar el DOM.
     */
    //Obtenemos el dataset

    let locationText = location.name.toString() + '%t' + location.comment.toString() + '%t' + location.lat.toString() + '%t' + location.lng.toString();
    console.log(locationText);


    const profileDataset = await getSolidDataset(session.info.webId, {
        fetch: session.fetch,
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
    

    const indexUrl = getSourceUrl(list);
    const listaLoc = await getSolidDataset(indexUrl, { fetch: session.fetch });
    const thing = getThing(listaLoc, indexUrl);
    const newThing = removeStringNoLocale(
        thing,
        "http://schema.org/text",
        locationText
    );
    console.log(newThing);
    const savedThing = setThing(listaLoc, newThing);
    await saveSolidDatasetAt(indexUrl, savedThing, { fetch: session.fetch });
    alert('Location ' + location.name + ' has been successfully removed');
    
}
