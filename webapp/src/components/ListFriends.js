import { Col, Container, Row } from "react-bootstrap";
import userPhoto from "../static/user.svg";
export default function ListFriends(totalFriends){
    return <Container className="manage-friends">
                    <Col className="group">
                        {totalFriends.map((friend) => {
                            return(  
                                <Row className='card'>
                                    <div className='left'>
                                        <img className='image' src={friend.image!== null? friend.image : userPhoto} alt='Profile'/>
                                    </div>
                                    <div className='center'>
                                        <div className='title'>
                                            {friend.name +" @" + friend.id.toString().split(".")[0].substring(8,friend.id.toString().split(".")[0].length)} 
                                        </div>
                                    </div>

                                    <div className='buttons-friend'>
                                        <button  className='button details' onClick={() => window.open(friend.id,"_blank")}>See Details</button>
                                    </div>
                                </Row>
                            );
                        })}
                    </Col>
                </Container>;
}