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
                <h1>Manage friends</h1>
                <p id='texto'>Here you are able to see your friends</p>
                <p>Friend list:</p>
                {statusFriends !== "fulfilled"? 
                    loadingScreen("margin-top-friends","We are searching for your friends...")
                :totalFriends.length !== 0?
                    listFriends(totalFriends)
                :
                    <p>There are no friends</p>
                }
            </div>);
    
}
export default ManageFriends;


 
