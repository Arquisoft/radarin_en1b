
import {useState} from "react";
import {LoginButton} from '@inrupt/solid-ui-react';
import {Button} from '@material-ui/core';
import "../css/App.css";
import logo from "../static/radar.svg"

function LoginForm(){
    // IDentity Provider, used to store the POD, in this case just inrupt.net
    const [idp] = useState("https://inrupt.net");
    const [currentUrl] = useState(window.location.href);

    var loggedIn = false;
    return(
        <div className="App">
            <div className="welcome">
                <div className="float">
                    <div className="spin">
                        <img className="logo-welcome" src={logo} alt="React Logo"></img>
                    </div>
                </div>
                <h1> Welcome to Radarin Manager</h1>
                <h2> Here you will be able to access and manage all data</h2>
                {(!loggedIn)? 
                    <LoginButton
                        oidcIssuer={idp}
                        redirectUrl={currentUrl}>
                        <Button variant="contained" color="primary">
                            Log In 
                        </Button>
                </LoginButton> : null}
                
            </div>     
        </div> 
    );
}

export default LoginForm;