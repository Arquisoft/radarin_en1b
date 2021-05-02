import "../css/App.css";
import Navbar from "./Navbar";
import {BrowserRouter,Switch,Route } from "react-router-dom";
import AboutUs from "./AboutUs";
import NotLoggedIn from "./NotLoggedIn";
import MapComponent from "./Map";
import LoginForm from "./LoginForm";
import Welcome from "./Welcome";
import ManageFriends from "./ManageFriends";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import waitingForLogIn from "./WaitingForLogin";

// IMPORTS FOR USER SESSION:
import {useState} from "react";
import {useSession} from "@inrupt/solid-ui-react/dist";
import { SessionProvider } from "@inrupt/solid-ui-react";
import { Provider } from "react-redux";
import store from "../utils/locationsRedux/store";

function App() {
  // Variable to check session state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Variables for log in: 
  const {session} = useSession();

  session.onLogin( () => { setIsLoggedIn(true);});
  session.onLogout( () => { setIsLoggedIn(false);});
  return (
    <SessionProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar/>
          <Switch>
            <Route path="/" exact component={(!isLoggedIn)? LoginForm : Welcome}/>
            <Route path="/map" exact component={(isLoggedIn)? MapComponent : NotLoggedIn}/>
            <Route path="/about-us" exact component={AboutUs}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/friends" exact component={(isLoggedIn)? ManageFriends : NotLoggedIn}/>
            <Route path="/wait" exact component={(!isLoggedIn)? waitingForLogIn : Welcome}/>
          </Switch>
        </BrowserRouter>
      </Provider>
    </SessionProvider>
  );
  
}
export default App;