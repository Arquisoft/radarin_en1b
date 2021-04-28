import {
    getStringNoLocale,
    getSolidDataset,
    getSourceUrl,
    getThing,
    getThingAll,
    getUrlAll,
} from "@inrupt/solid-client";
import { getOrCreateLocationList } from "./index.js";

const STORAGE_PREDICATE = "http://www.w3.org/ns/pim/space#storage";

export async function obtainUserLocation(session, person) { 
    /**
     * Con useEffect, le estamos diciendo a react que
     * queremos que el componente haga algo después de
     * ser renderizado.
     * Guardará la función que le pasemos para llamarla 
     * después de actualizar el DOM.
     */
    //Obtenemos el dataset

    let webID = person.id;

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

    const listaLoc = await getSolidDataset(indexUrl, { fetch: session.fetch });

    const things = getThingAll(listaLoc, indexUrl);

    let localizaciones = [];

    things.forEach((thing) => {
        localizaciones.push(getStringNoLocale(
            thing,
            "http://schema.org/text"
        ));
    });

    /**
    const localizaciones = getStringNoLocaleAll(
        thing,
        "http://schema.org/text"
    );
         */


    let localizacionesObjetos = [];
    localizaciones.forEach((localizacion) => {
        let parsedLocation = localizacion.split("%t");

        let parsedLocationObj = {
            name: parsedLocation[0],
            comment: parsedLocation[1],
            lat: parsedLocation[2],
            lng: parsedLocation[3]
        };

        localizacionesObjetos.push(parsedLocationObj);
    });


    
    return {id: person.id, name: person.name, localizaciones: localizacionesObjetos};
}

export default async function obtainUserLocations(session, friends) {
    let locations = [];

    let sessionUserLocations = await obtainUserLocation(session, {id: session.info.webId, name: "You"});
    locations.push(sessionUserLocations);

    for(const friend of friends) {
        let friendLocation = await obtainUserLocation(session, friend);
        locations.push(friendLocation);
    }


    return locations;
    
}