//import { FOAF } from "@inrupt/lit-generated-vocab-common";
import { fetchDocument } from "tripledoc";

async function getFriendsWebIds(session) {
    const webIdDoc = await fetchDocument(session.info.webId);
    const profile = webIdDoc.getSubject(session.info.webId);
    const friends = profile.getAllRefs('http://xmlns.com/foaf/0.1/knows');
    let result = [];

    for(const friend of friends) {
        const friendName = await getFriendName(friend);
        result = result.concat({id:friend, name: friendName});
    }

    return result;
}

async function getFriendName(friendId) {
    console.log(friendId);
    const webIdDoc = await fetchDocument(friendId);
    const profile = webIdDoc.getSubject(webIdDoc);
    
    return profile.getString('http://xmlns.com/foaf/0.1/name');
    
}

export default getFriendsWebIds;