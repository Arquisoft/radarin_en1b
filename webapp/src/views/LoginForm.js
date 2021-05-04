import "../css/App.css";
import "react-bootstrap";
import { Button, Col, Container, Row } from "react-bootstrap";
import logo from "../static/radarin-logo.png";
import {NavLink} from "react-router-dom";
function LoginForm(){
    return(
        <div className="welcome-container">
            <div className="card-home">
                <Container className="container-width">
                    <Row><div className='div-image-radarin'>
                        <Col className='margin-top-bot'><img src={logo} alt='radarin manager logo' className="image-radarin"/></Col></div>
                        <Col className='vl margin-top-bot'><h1> Welcome!</h1>
                            <h2>Here you will see yours and your friends' favourite locations</h2>
                                <div className='margin-top-button'>
                                        <NavLink to="/login"> 
                                            <Button> 
                                                Log In / Register 
                                            </Button>
                                        </NavLink>
                                </div>
                        </Col>
                    </Row>
                </Container>
                    
            </div>
        </div>   
    );

}

export default LoginForm;