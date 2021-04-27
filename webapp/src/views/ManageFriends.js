import React, { useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getFriends } from '../utils/friendsRedux/friendsSlice';
import { useSession } from '@inrupt/solid-ui-react/dist';
import '../css/Friends.css'
import loadingScreen from './LoadingScreen';
import ListFriends from '../components/ListFriends';


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
        return <div>{errorFriends}</div>
    }

    return (
            <div className='main'>
                <h1>Manage Friends</h1>
                <p id='texto'>Here you are able to see your friends.</p>
                <p className='no-margin'>Friend list:</p>
                {statusFriends !== 'fulfilled'? 
                loadingScreen("margin-top-friends")
                : 
                ListFriends(totalFriends)
                }
            </div>);
    
}
export default ManageFriends;


 
