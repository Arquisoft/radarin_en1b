import "../css/App.css";

import MapComponent from "../components/Map";

import LoginForm from "./LoginForm";

// IMPORTS FOR USER SESSION:
import {useState} from "react";
import {useSession} from "@inrupt/solid-ui-react/dist";
import { SessionProvider} from "@inrupt/solid-ui-react"; // SessionContext
import Navbar from "./Navbar";
import { BrowserRouter,Switch,Route } from "react-router-dom";
import AboutUs from "./AboutUs";
import NotLoggedIn from "./NotLoggedIn";
import StoreLocation from "../components/AddLocationForm";
import Welcome from "./Welcome";
import Login from "./Login";
import waitingForLogIn from "./WaitingForLogin";
import Banned from "./Banned";
import { isBanned } from "../api/api";

import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  // Variable to check session state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Variables for log in: 
  const {session} = useSession();

  //var banned = false;

  session.onLogin( async () => { 
    setIsLoggedIn(true);
    /*console.log(banned);
    banned = await isBanned(session.info.webId);
    console.log(banned);*/
  });
  session.onLogout( () => { setIsLoggedIn(false);});

  /*const banned = async () => {
    console.log(await isBanned(session.info.webId));
    return await isBanned(session.info.webId);
  };*/

  let banned = await isBanned(session.info.webId);

  return (
    <SessionProvider>
      <BrowserRouter>
        <Navbar session={session}/>
        <Switch>
          <Route path="/" exact component={(!isLoggedIn)? LoginForm : Welcome}/>
          <Route path="/map" exact render={(props) => (
            (isLoggedIn)? <MapComponent {...props} session={session} /> : <NotLoggedIn />
          )} />
          <Route path="/store-location" exact component={(!isLoggedIn)? NotLoggedIn : (banned)? Banned : StoreLocation}/>
          <Route path="/about-us" exact component={AboutUs}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/wait" exact component={(!isLoggedIn)? waitingForLogIn : Welcome}/>
        </Switch>
      </BrowserRouter>
    </SessionProvider>
  );
}

export default App;