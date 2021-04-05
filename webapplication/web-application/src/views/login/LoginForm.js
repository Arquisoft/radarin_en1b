
import {useState} from "react";
//import {useSession} from '@inrupt/solid-ui-react/dist';
import {LoginButton} from '@inrupt/solid-ui-react';
import {Button} from '@material-ui/core';

function LoginForm(){
    // IDentity Provider, used to store the POD, in this case just inrupt.net
    const [ idp, setIdp] = useState("https://inrupt.net");
    const [currentUrl, setCurrentUrl] = useState(window.location.href);

    return(
        <div className="App">
            <div className="welcome">
                <h1> Welcome to Radarin Manager</h1>
                <h2> Here you will be able to access and manage all data</h2>
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