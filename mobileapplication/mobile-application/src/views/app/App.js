import '../../css/App.css';

import MapComponent from '../../components/Map'

import LoginForm from '../login/LoginForm'

// IMPORTS FOR USER SESSION:
import {useState} from "react";
import {useSession} from '@inrupt/solid-ui-react/dist';
import { SessionProvider} from '@inrupt/solid-ui-react'; // SessionContext
import Navbar from '../navbar/Navbar';
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import AboutUs from '../aboutUs/AboutUs';
import NotLoggedIn from '../notLoggedIn/NotLoggedIn';
import StoreLocation from '../storeLocation/StoreLocation';
import Welcome from '../welcome/Welcome';


function App() {
  // Variable to check session state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Variables for log in: 
  const {session} = useSession();

  // IDentity Provider, used to store the POD, in this case just inrupt.net
  //const [ idp, setIdp] = useState("https://inrupt.net");
  //const [currentUrl, setCurrentUrl] = useState(window.location.href);

  session.onLogin( () => { setIsLoggedIn(true)})
  session.onLogout( () => { setIsLoggedIn(false)})

  return (
    <SessionProvider>
      <BrowserRouter>
        <Navbar/>
        <Switch>
          <Route path='/' exact component={(!isLoggedIn)? LoginForm : Welcome}/>
          <Route path='/map' exact render={(props) => (
            (isLoggedIn)? <MapComponent {...props} session={session} /> : <NotLoggedIn />
          )} />
          <Route path='/store-location' exact component={(isLoggedIn)? StoreLocation : NotLoggedIn}/>
          <Route path='/about-us' exact component={AboutUs}/>
        </Switch>
      </BrowserRouter>
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