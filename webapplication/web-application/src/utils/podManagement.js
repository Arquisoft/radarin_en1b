import React, { useEffect, useState } from "react";
import {
    addStringNoLocale,
    getStringNoLocale,
    createThing,
    getSolidDataset,
    getSourceUrl,
    getThing,
    getUrlAll,
    saveSolidDatasetAt,
    setThing,
} from "@inrupt/solid-client";
import { useSession } from "@inrupt/solid-ui-react";
import { getOrCreateLocationList } from "./index.js";

const STORAGE_PREDICATE = "http://www.w3.org/ns/pim/space#storage";

function ObtainLocations() {
    const { session } = useSession();
    const [locationList, setLocationList] = useState();

    const getLocations = async () => {
        const indexUrl = getSourceUrl(locationList);
        const listaLoc = await getSolidDataset(indexUrl, { fetch });
        const thing = getThing(listaLoc, indexUrl);
        const locationTexts = getUrlAll(
            thing,
            "http://schema.org/text"
        );

        console.log(locationTexts);
        return locationTexts;
    }

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
            //Conseguimos todos los URL de los POD del usuario, usando el estándar que le pasamos
            const podsUrls = getUrlAll(
                profileThing,
                STORAGE_PREDICATE
            );

            //Solo nos interesa el primer POD del usuario
            const pod = podsUrls[0];
            const containerUri = `${pod}locations/`; //Nombre de la carpeta, en el caso del ejemplo es Todos
            const list = await getOrCreateLocationList(containerUri, session.fetch);
            setLocationList(list);
        })();
    }, [session]); //Le indicamos al useEffect que solo esté atento a la sesión

    console.log(locationList);
    return getLocations();
}

function AddLocations(locations) {
    const { session } = useSession();
    const [locationList, setLocationList] = useState();


    const addLocation = async (text) => {
        const indexUrl = getSourceUrl(locationList);
        const listaLoc = await getSolidDataset(indexUrl, { fetch });
        const thing = getThing(listaLoc, indexUrl);
        const locationWithText = addStringNoLocale(
            thing,
            "http://schema.org/text",
            text
        );
        const savedThing = setThing(locationsList, locationWithText);

        const save = await saveSolidDatasetAt(indexUrl, savedThing, { fetch: session.fetch });
        setLocationList(save);
    }

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
            //Conseguimos todos los URL de los POD del usuario, usando el estándar que le pasamos
            const podsUrls = getUrlAll(
                profileThing,
                STORAGE_PREDICATE
            );

            //Solo nos interesa el primer POD del usuario
            const pod = podsUrls[0];
            const containerUri = `${pod}locations/`; //Nombre de la carpeta, en el caso del ejemplo es Todos
            const list = await getOrCreateLocationList(containerUri, session.fetch);
            setLocationList(list);
        })();
    }, [session]); //Le indicamos al useEffect que solo esté atento a la sesión

    console.log(locationList);
    
    locations.array.forEach(element => {
        addLocation(element);
    });
}

export default AddTodo;