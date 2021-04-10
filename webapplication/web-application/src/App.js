import logo from './logo.svg';
import './App.css';

import MapComponent from './Map';

import LoginForm from './components/LoginForm';

// IMPORTS FOR USER SESSION:
import {useState} from "react";
import {useSession} from '@inrupt/solid-ui-react/dist';
import {SessionProvider} from '@inrupt/solid-ui-react';
import ObtainLocations from "../src/utils/GetLocations";
import store from './utils/locationsRedux/store.js';
import { Provider } from 'react-redux';



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
    <SessionProvider>
      
        {(!isLoggedIn)? <LoginForm/> : 
        <Provider store={store}>
          <ObtainLocations/>
          <Map/>
        </Provider>}
      
    </SessionProvider>
  );
  
  /*
  return (

    <div className="App">

      
      <SessionProvider sessionId="log-in-exameple">      
        {<LoginForm/>}      
      </SessionProvider>

      <h1>Radarin map preliminary version</h1>
      <div id="webMap">
        <MapComponent />
      </div>
    </div>
  );
  */
}

export default App;