
import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import '../css/App.css';
import {useState} from "react";
import {LoginButton} from '@inrupt/solid-ui-react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import solid from '../static/solidcommunity.png'
import inrupt from '../static/inrupt.png'

export default function Login(){

    const [oidcIssuer, setOidcIssuer] = useState("");
    const [provider, setProvider] = useState('');

    const handleChange = (event) => {
        setOidcIssuer(event.target.value);
        setProvider(event.target.value);
    };

    const authOptions = {
        clientName: "Radarin Manager",
      };

  return(
        <div className="welcome-container lg-text">
        <div className='thanks'>
              <h1>Thanks for using Radarin Manager!</h1>
        </div>
            <div className="card-welcome sm">
            <Container fluid="md">
                        <Row className='margin-sides fixed margin-top'>
                            <h2>Select a Provider:</h2>
                            <span >
                            <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={provider}
                            onChange={handleChange}
                            className='select-provider'
                            >
                                <MenuItem value="">
                                    <em>Select a Provider</em>
                                </MenuItem>
                                <MenuItem value={"https://inrupt.net"} className='sm-lg-text'><img src={inrupt} className='image-combo margin-side' alt='inrupt logo'/> Inrupt</MenuItem>
                                <MenuItem value={"https://solidcommunity.net"} className='sm-lg-text'><img src={solid} className='image-combo margin-side' alt='solid community logo'/> Solid Community</MenuItem>
                            </Select>
                                
                            </span></Row>
                        <Row className='margin-sides fixed margin-top'>
                            <h3>If you dont have a pod you can register for one </h3>
                            <Button>Register for a SOLID POD</Button>
                        </Row>
                        <Row className='margin-bot'>
                            <Col ><hr className='loginleft'/></Col>
                            <Col className='overflow-visible'>Log in </Col>
                            <Col ><hr className='loginright'/></Col>
                        </Row>
                        <Row className='margin-bot fixed sm-lg-text'>
                            <h3>If you already have a Provider</h3>
                            <LoginButton
                            oidcIssuer={oidcIssuer}
                            redirectUrl={"http://localhost:3000"}
                            authOptions={authOptions}
                            target="_blank"
                            >
                            <Button className='margin-top'>
                                Log In
                            </Button>
                            </LoginButton>

                            </Row>
                </Container>
            </div>
        </div>
  );
};