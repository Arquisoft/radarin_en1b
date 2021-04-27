export default function parseLocations(totalLocations, webId) {
    let toRet = [];
    let friendsLocations = [];
    totalLocations.forEach((info) => {
        if (info.id === webId) {
            let markers = [];
            info.localizaciones.forEach((location) => {
                markers.push(location);
            });
            toRet.push(markers);
        } else {
            info.localizaciones.forEach((location) => {
                friendsLocations.push({
                    author: info.name,
                    name: location.name,
                    comment: location.comment,
                    lat: location.lat,
                    lng: location.lng,
                });
            });
        }
    });
    toRet.push(friendsLocations);

    return toRet;
}