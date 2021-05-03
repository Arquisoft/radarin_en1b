import { Col, Container, Row } from "react-bootstrap";
import { addUserOrUpdateBanned } from "../api/api";
export default function ListUsers(normalUsers, render, setRender){
    return <Container className="manage-friends">
                    <Col className="group">
                        {Array.from(normalUsers.keys()).map((user) => {
                            return(
                                <Row className='card'>
                                    <div className='center'>
                                        <div className='title'>
                                            {user.toString().split(".")[0].substring(8,user.toString().split(".")[0].length)} 
                                        </div>
                                    </div>
                                    {(normalUsers.get(user))?
                                    <div className='buttons-friend'>
                                        <button  className='button details' onClick={async () => {await addUserOrUpdateBanned(user, [0, 0], false); setRender(render + 1);}}>Unban</button>
                                    </div>
                                    :
                                    <div className='buttons-friend'>
                                        <button  className='button details' onClick={async () => {await addUserOrUpdateBanned(user, [0, 0], true); setRender(render - 1);}}>Ban</button>
                                    </div>
                                    }
                                </Row>
                            );
                        })}
                    </Col>
                </Container>;
}