import React, { useState, useEffect } from "react";
import "../css/Friends.css";
import loadingScreen from "./LoadingScreen";
import listUsers from "../components/ListUsers";
import { getNormalUsers } from "../api/api";


function AdministerUsers() {
    const [normalUsers, setNormalUsers] = useState(null);
    const [render, setRender] = useState(0);

    useEffect(() => {async function fetchData(){let users = await getNormalUsers();let map = new Map();for (let user of users) {map.set(user.webId, user.banned);}setNormalUsers(map);}fetchData();
    }, [render]);

    return (
            <div className='main'>
                <h1>Administer users</h1>
                <p id='texto'>Here you can manage the Radarin users</p>
                <p>User list:</p>
                {normalUsers === null? 
                    loadingScreen("margin-top-friends","We are searching for the Radarin users...")
                :normalUsers.size !== 0?
                    listUsers(normalUsers, render, setRender)
                :
                    <p>There are no users</p>
                }
            </div>);
}
export default AdministerUsers;


 
