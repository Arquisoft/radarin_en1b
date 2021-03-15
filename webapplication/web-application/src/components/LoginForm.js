
import {useState} from "react";
//import {useSession} from '@inrupt/solid-ui-react/dist';
import {LoginButton} from '@inrupt/solid-ui-react';
import {Button} from '@material-ui/core';


function LoginForm () {
    // IDentity Provider, used to store the POD, in this case just inrupt.net
    const [ idp, setIdp] = useState("https://inrupt.net");
    const [currentUrl, setCurrentUrl] = useState(window.location.href);

    return(
    <LoginButton
        oidcIssuer={idp}
        redirectUrl={currentUrl}
    >
        <Button variant="contained" color="primary" >
            Log In
        </Button>             
    </LoginButton>       
    );
}

export default LoginForm;