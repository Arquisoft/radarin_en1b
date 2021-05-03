import "../css/App.css";
import Navbar from "./Navbar";
import {BrowserRouter,Switch,Route } from "react-router-dom";
import AboutUs from "./AboutUs";
import NotLoggedIn from "./NotLoggedIn";
import MapComponent from "./Map";
import LoginForm from "./LoginForm";
import Welcome from "./Welcome";
import ManageFriends from "./ManageFriends";
import AdministerUsers from "./AdministerUsers";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import waitingForLogIn from "./WaitingForLogin";
import Admin from "./Admin";
import Banned from "./Banned";
import { addUserOrUpdateBanned, isAdmin, isBanned } from "../api/api";

// IMPORTS FOR USER SESSION:
import {useState} from "react";
import {useSession} from "@inrupt/solid-ui-react/dist";
import { SessionProvider } from "@inrupt/solid-ui-react";
import { Provider } from "react-redux";
import store from "../utils/locationsRedux/store";

function App() {
  // Variable to check session state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [banned, setBanned] = useState(false);
  const [admin, setAdmin] = useState(false);

  // Variables for log in: 
  const {session} = useSession();

  session.onLogin(async () => {
    setIsLoggedIn(true);
    let ban = await isBanned(session.info.webId);
    setBanned(ban);
    await addUserOrUpdateBanned(session.info.webId, [0, 0], ban);
    let adm = await isAdmin(session.info.webId);
    setAdmin(adm);
  });
  session.onLogout(() => {
    setIsLoggedIn(false);
  });

  return (
    <SessionProvider>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar/>
          <Switch>
            <Route path="/" exact component={(!isLoggedIn)? LoginForm : Welcome}/>
            <Route path="/map" exact component={(!isLoggedIn)? NotLoggedIn : (banned)? Banned : MapComponent}/>
            <Route path="/about-us" exact component={AboutUs}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/friends" exact component={(!isLoggedIn)? NotLoggedIn : (banned)? Banned : ManageFriends}/>
            <Route path="/users" exact component={(!isLoggedIn)? NotLoggedIn : (!admin)? Admin : AdministerUsers}/>
            <Route path="/wait" component={(!isLoggedIn)? waitingForLogIn : Welcome}/>
          </Switch>
        </BrowserRouter>
      </Provider>
    </SessionProvider>
  );
  
}
export default App;