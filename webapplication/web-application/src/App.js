import logo from './logo.svg';
import './App.css';

import MapComponent from './Map'

// IMPORTS FOR USER SESSION:
import {useState} from "react";
import {useSession} from '@inrupt/solid-ui-react/dist';
import {SessionProvider,  LoginButton} from '@inrupt/solid-ui-react';
import {Button} from '@material-ui/core';


function App() {
  // Variable to check session state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Variables for log in: 
  const {session} = useSession();

  // IDentity Provider, used to store the POD, in this case just inrupt.net
  const [ idp, setIdp] = useState("https://inrupt.net");
  const [currentUrl, setCurrentUrl] = useState(window.location.href);

  session.onLogin( () => { setIsLoggedIn(true)})
  session.onLogout( () => { setIsLoggedIn(false)})

  
 
  return (

    <div className="App">

      { /*For the session LogIn we use Session Provider and Log in: */}
      <SessionProvider sessionId="log-in-exameple">      
        <LoginButton
            oidcIssuer={idp}
            redirectUrl={currentUrl}
        >
        <Button variant="contained" color="primary" >
              Log In
          </Button>             
        </LoginButton>       
      </SessionProvider>

      <h1>Radarin map preliminary version</h1>
      <MapComponent />
    </div>
  );
}

export default App;
