import React, { useEffect, useState } from "react";
import {
    getStringNoLocaleAll,
    getSolidDataset,
    getSourceUrl,
    getThing,
    getUrlAll,
} from "@inrupt/solid-client";
import { useSession } from "@inrupt/solid-ui-react";
import { getOrCreateLocationList } from "./index.js";
import {addFriendLocations} from './utils/locationsRedux';

const STORAGE_PREDICATE = "http://www.w3.org/ns/pim/space#storage";

function ObtainFriendsLocations(webId) {
    const { session } = useSession();
    const [locationList, setLocationList] = useState(null);
    const [locationTexts, setLocationTexts] = useState([]);


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
            const profileDataset = await getSolidDataset(webId, {
                fetch: session.fetch,
            });

            //Obtenemos la "Thing" del perfil con la información del dataset
            const profileThing = getThing(profileDataset, webId);
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

            const indexUrl = getSourceUrl(list);
            console.log(indexUrl);
            const listaLoc = await getSolidDataset(indexUrl, { fetch: session.fetch });
            console.log(listaLoc);
            const thing = getThing(listaLoc, indexUrl);
            console.log(thing);
            const localizaciones = getStringNoLocaleAll(
                thing,
                "http://schema.org/text"
            );
            setLocationTexts(localizaciones);

        })();

    }, [session]); //Le indicamos al useEffect que solo esté atento a la sesión

    addFriendLocations(locationTexts);
}

export default ObtainFriendsLocations;