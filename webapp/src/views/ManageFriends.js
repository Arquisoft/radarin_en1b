import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getFriends } from '../utils/friendsRedux/friendsSlice';
import { useSession } from '@inrupt/solid-ui-react/dist';
import SyncLoader from "react-spinners/SyncLoader";
import { css } from "@emotion/core";
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import CardGroup from 'react-bootstrap/CardGroup';
import CardColumns from 'react-bootstrap/CardColumns';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <div className="manage-friends">
            <CardGroup>
            {totalFriends.map((friend) => {
                        return <Card style={{ width: '18rem'}}>
                        <Card.Img variant="top" src="holder.js/100px180" />
                        <Card.Body>
                            <Card.Title>{friend.name}</Card.Title>
                            <Card.Text>
                            {friend.id}
                            </Card.Text>
                        </Card.Body>
                        <Button variant="danger" onClick={() => deleteFriend(friend.id, session)}>Delete friend</Button>
                        <Button variant="primary" onClick={() => window.location.href = friend.id}>
                            See Details</Button>
                        </Card>
            })}
            </CardGroup>
        </div>
    );}
    
    return <div className="manage-friends">{content}</div>;
}
export default ManageFriends;

 async function ldflexDeleter(friend, webId) {
    return ldflex[webId].knows.delete(ldflex[friend]);
  }
  
 async function deleteFriend(friend, session) {
    await ldflexDeleter(friend, session.info.webId);
    await reload();
  }

 
