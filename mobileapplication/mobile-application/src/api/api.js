
//REACT_APP_API_URI is an enviroment variable defined in the file .env.development or .env.production
export async function addUserOrUpdateLocation(webId,location){
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api';
    let response = await fetch(apiEndPoint+'/users/add', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({'webId':webId, 'location':location})
    })
    return await response.json();
}

export async function getNearFriends(location,friends){
    const apiEndPoint= process.env.REACT_APP_API_URI || 'http://localhost:5000/api';
    let response = await fetch(apiEndPoint+'/users/list', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({'location':location, 'friends':friends})
    })
    return await response.json();
}