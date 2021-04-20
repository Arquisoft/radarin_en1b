import '../css/App.css';
import Navbar from './Navbar';
import {BrowserRouter,Switch,Route } from 'react-router-dom';
import AboutUs from './AboutUs';
import NotLoggedIn from './NotLoggedIn';
import LoginForm from './LoginForm';
import Welcome from './Welcome'
// IMPORTS FOR USER SESSION:
import {useState} from "react";
import {useSession} from '@inrupt/solid-ui-react/dist';


function App() {
  // Variable to check session state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Variables for log in: 
  const {session} = useSession();

  // IDentity Provider, used to store the POD, in this case just inrupt.net
  //const [ idp, setIdp] = useState("https://inrupt.net");
  //const [currentUrl, setCurrentUrl] = useState(window.location.href);

  session.onLogin( () => { setIsLoggedIn(true)});
  session.onLogout( () => { setIsLoggedIn(false)});

  return (
    <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route path='/' exact component={(!isLoggedIn)? LoginForm : Welcome}/>
        <Route path='/map' exact component={NotLoggedIn}/>
        <Route path='/about-us' exact component={AboutUs}/>
        <Route path='/docs' component={() => { 
          window.location.href = 'https://radarinen1bwebapp.herokuapp.com/docs/'; 
           return null;
        }}/>
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