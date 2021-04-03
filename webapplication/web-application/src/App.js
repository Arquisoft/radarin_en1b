import logo from './logo.svg';
import './App.css';

import MapComponent from './Map'

import LoginForm from './components/LoginForm'
import MainView from './components/MainView'

// IMPORTS FOR USER SESSION:
import {useState} from "react";
import {useSession} from '@inrupt/solid-ui-react/dist';
import {SessionProvider} from '@inrupt/solid-ui-react';

//NAV THINGS
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Navigation from './components/Navigation';


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
      <Navigation/>
      <Switch>
        <Route path = '/home' component={Home}/>
        <Route path = '/login' component={LoginForm}/>
        <Route path = '/map' component={MainView}/>
      </Switch>
      <SessionProvider>
        {(!isLoggedIn)? <LoginForm/> : <MainView/>}
      </SessionProvider>
    </div>
    
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