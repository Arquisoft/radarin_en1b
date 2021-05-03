
//REACT_APP_API_URI is an enviroment variable defined in the file .env.development or .env.production
export async function addUserOrUpdateBanned(webId,location,banned){
    const apiEndPoint= process.env.REACT_APP_API_URI || "http://localhost:5000/api";
    let response = await fetch(apiEndPoint+"/users/add", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({"webId":webId, "location":location, "banned":banned})
    });
    return await response.json();
}

export async function isAdmin(webId){
    const apiEndPoint= process.env.REACT_APP_API_URI || "http://localhost:5000/api";
    let response = await fetch(apiEndPoint+"/users/admin", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({"webId":webId})
    });
    return await response.json();
}

export async function isBanned(webId){
    const apiEndPoint= process.env.REACT_APP_API_URI || "http://localhost:5000/api";
    let response = await fetch(apiEndPoint+"/users/banned", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({"webId":webId})
    });
    return await response.json();
}

export async function getNormalUsers(){
    const apiEndPoint= process.env.REACT_APP_API_URI || "http://localhost:5000/api";
    let response = await fetch(apiEndPoint+"/users/normal");
    return await response.json();
}
