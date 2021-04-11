//import { FOAF } from "@inrupt/lit-generated-vocab-common";
import { fetchDocument } from "tripledoc";

async function getFriendsWebIds(session) {
    const webIdDoc = await fetchDocument(session.info.webId);
    const profile = webIdDoc.getSubject(session.info.webId);
    const friends = profile.getAllRefs('http://xmlns.com/foaf/0.1/knows');
    let result = [];
    friends.forEach( async (friend) => {
        const friendName = await getFriendName(friend);
        result.concat({id:friend, name: friendName});
    });
    return friends;
}

async function getFriendName(friendId) {
    const webIdDoc = await fetchDocument(friendId);
    const profile = webIdDoc.getSubject(webIdDoc);
    return profile.getString('http://xmlns.com/foaf/0.1/name');
    
}

export default getFriendsWebIds;