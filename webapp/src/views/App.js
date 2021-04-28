import "../css/App.css";
import Navbar from "./Navbar";
import {BrowserRouter,Switch,Route } from "react-router-dom";
import AboutUs from "./AboutUs";
import NotLoggedIn from "./NotLoggedIn";
import MapComponent from "./Map";
import LoginForm from "./LoginForm";
import Welcome from "./Welcome";
import ManageFriends from "./ManageFriends";
// IMPORTS FOR USER SESSION:
import {useState} from "react";
import {useSession} from "@inrupt/solid-ui-react/dist";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";

function App() {
  // Variable to check session state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Variables for log in: 
  const {session} = useSession();

  session.onLogin( () => { setIsLoggedIn(true);});
  session.onLogout( () => { setIsLoggedIn(false);});
  return (
    <BrowserRouter>
      <Navbar/>
      <Switch>
        <Route path="/" exact component={(!isLoggedIn)? LoginForm : Welcome}/>
        <Route path="/map" exact component={(isLoggedIn)? MapComponent : NotLoggedIn}/>
        <Route path="/about-us" exact component={AboutUs}/>
        <Route path="/login" component={Login}/>
        <Route path="/friends" exact component={(isLoggedIn)? ManageFriends : NotLoggedIn}/>
      </Switch>
    </BrowserRouter>
  );
  
}
export default App;