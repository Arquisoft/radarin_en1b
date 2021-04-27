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

    }else{
        return (
            <div className='main'>
                <h1>Manage Friends</h1>
                <p id='texto'>Here you are able to see your friends.</p>
                <p className='no-margin'>Friend list:</p>
                {statusFriends !== 'fulfilled'? 
                <div className= 'margin-top-friends' >
                    <h1>Radarin Manager is searching for your friends</h1>
                    <SyncLoader css={css`display: block;margin: 0 auto;border-color: red;`} size={40} color={"rgb(9, 71, 241)"} />
                </div> 
                : 
                <Container className="manage-friends">
                    <Col className="group">
                        {totalFriends.map((friend) => {
                                    return(
                                        <Row className='card'>
                                            <div className='left'>
                                                <img className='image' src={friend.image!== null? friend.image : userPhoto} alt='Profile'/>
                                            </div>
                                            <div className='center'>
                                                <div className='title'>
                                                    {friend.name +' @' + friend.id.toString().split('.')[0].substring(8,friend.id.toString().split('.')[0].length)} 
                                                </div>
                                            </div>

                                            <div className='buttons-friend'>
                                                        <button  className='button details' onClick={() => window.open(friend.id,"_blank")}>See Details</button>
                                            </div>
                                        </Row>
                                    );
                        })}
                    </Col>
                </Container>}
            </div>);
    }
}
export default ManageFriends;


 
