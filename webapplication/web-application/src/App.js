import logo from './static/logo.svg';
import './css/App.css';

import MapComponent from './components/Map'

import LoginForm from './views/login/LoginForm'
import MainView from './views/mainView/MainView'

// IMPORTS FOR USER SESSION:
import {useState} from "react";
import {useSession} from '@inrupt/solid-ui-react/dist';
import {SessionProvider} from '@inrupt/solid-ui-react';
import Navbar from './views/navbar/Navbar';
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import AboutUs from './views/aboutUs/AboutUs';



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
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path='/' exact component={LoginForm}/>
        <Route path='/map' exact component={MapComponent}/>
        <Route path='/about-us' exact component={AboutUs}/>
      </Switch>
    </BrowserRouter>
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