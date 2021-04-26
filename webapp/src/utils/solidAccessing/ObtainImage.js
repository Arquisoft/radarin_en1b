import { fetchDocument } from "tripledoc";

export default async function getPhoto(session) {
    const name= session.info.webId.split('card')[0]
    const what = await fetchDocument(name);
    const img = what.getStore().toArray()[4].object.value;
    if(img.includes(name)){
        return img;
    }
    return null;
}