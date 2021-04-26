//import { FOAF } from "@inrupt/lit-generated-vocab-common";
import { fetchDocument } from "tripledoc";
import { VCARD } from "@inrupt/vocab-common-rdf";
import {
    getStringNoLocale,
    getSolidDataset,
    getThing
} from "@inrupt/solid-client";

async function getFriendsWebIds(session) {
    const webIdDoc = await fetchDocument(session.info.webId);
    const profile = webIdDoc.getSubject(session.info.webId);
    const friends = profile.getAllRefs('http://xmlns.com/foaf/0.1/knows');
    let result = [];

    for (const friend of friends) {
        const friendName = await getFriendName(friend, session);
        const friendImage = await getFriendImage(friend, session);
        result = result.concat({ id: friend, name: friendName, image:friendImage });
    }

    return result;
}


async function getFriendName(friendId, session) {
    const myDataset = await getSolidDataset(friendId.split("#")[0], { fetch: session.fetch });
    const profile = getThing(myDataset, friendId);
    const fn = getStringNoLocale(profile, VCARD.fn);
    return fn;
}

async function getFriendImage(friendId, session){
    const myDataset = await getSolidDataset(friendId.split("#")[0], { fetch: session.fetch });
    const profile = getThing(myDataset, friendId);
    const hasPhoto = getStringNoLocale(profile, VCARD.hasPhoto);
    console.log(hasPhoto);
    return hasPhoto;
}

export default getFriendsWebIds;