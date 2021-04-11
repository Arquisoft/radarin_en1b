import {
    getStringNoLocaleAll,
    getSolidDataset,
    getSourceUrl,
    getThing,
    getUrlAll,
} from "@inrupt/solid-client";
import { getOrCreateLocationList } from "./index.js";

const STORAGE_PREDICATE = "http://www.w3.org/ns/pim/space#storage";


export default async function obtainUserLications(session, friends) {
    let friends = [];
    obtainUserLocation(session, session.info.webId);

    friends.forEach((friends) => await obtainUserLocation(session, freidn.id));
}

async function obtainUserLocation(session, webID) { 

    /**
     * Con useEffect, le estamos diciendo a react que
     * queremos que el componente haga algo después de
     * ser renderizado.
     * Guardará la función que le pasemos para llamarla 
     * después de actualizar el DOM.
     */
    //Obtenemos el dataset

    let err = false;

    const profileDataset = await getSolidDataset(webID, {
        fetch: session.fetch,
    });


    //Obtenemos la "Thing" del perfil con la información del dataset
    const profileThing = getThing(profileDataset, webID);
    //Conseguimos todos los URL de los POD del usuario, usando el estándar que le pasamos
    const podsUrls = getUrlAll(
        profileThing,
        STORAGE_PREDICATE
    );
    //Solo nos interesa el primer POD del usuario
    const pod = podsUrls[0];
    const containerUri = `${pod}public/locations/`; //Nombre de la carpeta, en el caso del ejemplo es Todos
    let isMainUser = session.info.webId === webID;
    const list = await getOrCreateLocationList(containerUri, isMainUser, session.fetch).catch((e) => {
        err = true;
    });
    
    if(err) {
        return { id: webID, localizaciones: []};
    }

    const indexUrl = getSourceUrl(list);
    console.log(indexUrl);
    const listaLoc = await getSolidDataset(indexUrl, { fetch: session.fetch });
    console.log(listaLoc);
    const thing = getThing(listaLoc, indexUrl);
    const localizaciones = getStringNoLocaleAll(
        thing,
        "http://schema.org/text"
    );

    let localizacionesObjetos = [];
    localizaciones.forEach((localizacion) => {
        let parsedLocation = localizacion.split('%t');

        let parsedLocationObj = {
            name: parsedLocation[0],
            comment: parsedLocation[1],
            lat: parsedLocation[2],
            lng: parsedLocation[3]
        };

        localizacionesObjetos.push(parsedLocationObj);
    })

    console.log("payo ke e yegao alffinal lokin");

    
    return {id: webID, localizaciones: localizacionesObjetos};
}
