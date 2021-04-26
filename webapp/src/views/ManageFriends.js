import React, { useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getFriends } from '../utils/friendsRedux/friendsSlice';
import { useSession } from '@inrupt/solid-ui-react/dist';
import SyncLoader from "react-spinners/SyncLoader";
import { css } from "@emotion/core";
import '../css/Friends.css'
import userPhoto from '../static/user.svg';
import { Col, Container, Row } from 'react-bootstrap';

function ManageFriends() {
    const dispatch = useDispatch();
    const { session } = useSession();
    let content;
    const statusFriends = useSelector((state) => state.friends.status);
    const totalFriends = useSelector((state) => state.friends.value);
    const errorFriends = useSelector((state) => state.friends.error);

    useEffect(() => {
        if (statusFriends === "idle") {
            dispatch(
                getFriends(session)
            );
        }
        else if(statusFriends === "fulfilled"){
            console.log(totalFriends);
        }
    });//, [statusLocations, statusFriends]);

    function getUsermame(friend){
        var splitted = friend.id.toString().split('.')[0];
        return friend.name +' @' + splitted.substring(8,splitted.length);
    }

    function addFriends(){

    }

    if (statusFriends === "pending" || statusFriends === "idle") {
        const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
        `;
        content = <div className="waiting-screen">
                    <h1>Radarin Manager is searching for your friends</h1>
                    <SyncLoader css={override} size={40} color={"rgb(9, 71, 241)"} />
                  </div>
    } else if (statusFriends === "rejected") {
        content = <div>{errorFriends}</div>

    }else if (statusFriends === "fulfilled"){
        content = (
            <div className='main'>
                <h1>Manage Friends</h1>
                <p id='texto'>Here you are able to add, see and remove your friends.</p>
                <button id='btnAdd' className='add-friend button' onClick={addFriends()}>Add Friend</button>
                <input id='addFriend' className='button length-input'></input>
                <p className='no-margin'>Friend list:</p>
                <Container className="manage-friends">
                    <Col className="group">
                        {totalFriends.map((friend) => {
                                    return(
                                        <Row className='card'>
                                            <div className='left'>
                                                <img className='image' src={checkForPhoto(friend.image)} alt='Profile'/>
                                            </div>
                                            <div className='center'>
                                                <div className='title'>
                                                    {getUsermame(friend)} 
                                                </div>
                                            </div>

                                            <div className='buttons-friend'>
                                                        <button className='button delete'>Delete friend</button>
                                                        <button  className='button details' onClick={() => window.open(friend.id,"_blank")}> See Details</button>
                                            </div>
                                        </Row>
                                    );
                        })}
                    </Col>
                </Container>
            </div>
    );}
    
    return <div>{content}</div>;
}
export default ManageFriends;

function checkForPhoto(photo){
    if (photo !== null){
        return photo;
    }

    return userPhoto;
}

 //async function ldflexDeleter(friend, webId) {
     //return ldflex[webId].knows.delete(ldflex[friend]);
 // }
  
 //async function deleteFriend(friend, session) {
   // await ldflexDeleter(friend, session.info.webId);
    //await reload();
//}

 
