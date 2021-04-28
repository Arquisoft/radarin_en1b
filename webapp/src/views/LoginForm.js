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
                    <Row className='adjust'><div className='div-image-radarin'>
                        <Col className='margin-top-bot'><img src={logo} alt='radarin manager logo' className="image-radarin"/></Col></div>
                        <Col className='vl margin-top-bot bottom-button'><h1> Welcome!</h1>
                            <h2>Here you will be able to manage your data</h2>
                                <div className='margin-top-button'>
                                        <NavLink to="/login"> 
                                            <Button className='login-button'> 
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