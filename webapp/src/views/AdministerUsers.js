import React, { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { getFriends } from "../utils/friendsRedux/friendsSlice";
import { useSession } from "@inrupt/solid-ui-react/dist";
import "../css/Friends.css";
import loadingScreen from "./LoadingScreen";
import listFriends from "../components/ListFriends";


function ManageFriends() {
    const dispatch = useDispatch();
    const { session } = useSession();
    const statusFriends = useSelector((state) => state.friends.status);
    const totalFriends = useSelector((state) => state.friends.value);
    const errorFriends = useSelector((state) => state.friends.error);
    useEffect(() => {
        if (statusFriends === "idle") {
            dispatch(
                getFriends(session)
            );
        }
    });//, [statusLocations, statusFriends]);

    if (statusFriends === "rejected") {
        return <div>{errorFriends}</div>;
    }

    return (
            <div className='main'>
                <h1>Administer users</h1>
                <p id='texto'>Here you can manage the Radarin users</p>
                <p>User list:</p>
                {statusFriends !== "fulfilled"? 
                    loadingScreen("margin-top-friends","We are searching for the Radarin users...")
                : 
                    listFriends(totalFriends)
                }
            </div>);
    
}
export default ManageFriends;


 
