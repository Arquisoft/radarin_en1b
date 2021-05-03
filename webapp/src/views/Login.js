
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import "../css/App.css";
import {useState} from "react";
import {LoginButton} from "@inrupt/solid-ui-react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import solid from "../static/solidcommunity.png";
import inrupt from "../static/inrupt.png";
import { NavLink } from "react-router-dom";

export default function Login(){

    const [oidcIssuer, setOidcIssuer] = useState("");

    const handleChange = (event) => {
        setOidcIssuer(event.target.value);
    };

    const authOptions = {
        clientName: "Radarin Manager",
      };

  return(
        <div className="welcome-container">
        <div className='thanks'>
              <h1>Thanks for using Radarin Manager!</h1>
        </div>
            <div className="card-welcome sm">
            <Container fluid="md">
                        <Row className='fixed margin-top'>
                            <h2>Select a provider:</h2>
                            <span >
                            <Select
                            labelId="demo-simple-select-filled-label"
                            id="combo"
                            value={oidcIssuer}
                            onChange={handleChange}
                            data-testid="combo"
                            className='select-provider sm-lg-text'
                            >
                                <MenuItem value="">
                                    <em>Select a provider</em>
                                </MenuItem>
                                <MenuItem value={"https://inrupt.net"} data-testid="Inrupt"><img src={inrupt} className='image-combo' alt='inrupt logo'/> Inrupt</MenuItem>
                                <MenuItem value={"https://solidcommunity.net"} ><img src={solid} className='image-combo' alt='solid community logo'/> Solid Community</MenuItem>
                            </Select>
                                
                            </span></Row>
                        <Row className='fixed margin-top'>
                            <h3>If you don't have a pod, you can register for one </h3>
                            <Button onClick={() => oidcIssuer !== "" ? window.open( oidcIssuer + "/register","blank"): null}>Register for a SOLID POD</Button>
                        </Row>
                        <Row className='margin-bot'>
                            <Col ><hr className='loginleft'/></Col>
                            <Col className='overflow-visible'>Login </Col>
                            <Col ><hr className='loginright'/></Col>
                        </Row>
                        <Row className='margin-bot fixed'>
                            <h3>If you already have a provider</h3>
                            <NavLink to="/">
                                <LoginButton
                                oidcIssuer={oidcIssuer}
                                redirectUrl={window.location.href.split("login")[0]}
                                authOptions={authOptions}
                                >
                                <Button className='margin-top'>
                                    Log In
                                </Button>
                                </LoginButton>
                            </NavLink>
                            </Row>
                </Container>
            </div>
        </div>
  );
}