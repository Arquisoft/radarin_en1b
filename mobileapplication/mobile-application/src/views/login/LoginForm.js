import {useState} from "react";
import {LoginButton} from "@inrupt/solid-ui-react";
import {Button} from "@material-ui/core";
import "../../css/App.css";
import logo from "../../static/radar.svg";

function LoginForm(){
    // IDentity Provider, used to store the POD, in this case just inrupt.net
    const [idp] = useState("https://inrupt.net");
    const [currentUrl] = useState(window.location.href);

    return(
        <div className="App">
            <div className="welcome">
                <div className="float">
                    <div className="spin">
                        <img className="logo-welcome" src={logo} alt="React Logo"></img>
                    </div>
                </div>
                <h1> Welcome to Radarin Radar</h1>
                <h2> Here your locations will be recorded and you will be able to upload your favourite locations</h2>
                <LoginButton
                    oidcIssuer={idp}
                    redirectUrl={currentUrl}>
                    <Button variant="contained" color="primary" >
                        Log In
                    </Button>
                </LoginButton>
            </div>     
        </div> 
    );
}

export default LoginForm;