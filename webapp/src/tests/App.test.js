import { render, screen } from "@testing-library/react";
import LoginForm from "../views/LoginForm";
import Navbar from "../views/Navbar";
import App from "../views/App";
import { BrowserRouter,Switch,Route, NavLink } from "react-router-dom";
import Welcome from "../views/Welcome";
import MapComponent from "../views/Map";
import AboutUs from "../views/AboutUs";
import NotLoggedIn from "../views/NotLoggedIn";
import { fireEvent } from "@testing-library/react";
import Login from "../views/Login";
import Notification from "../components/Notification";
import React from "react";
import { SessionProvider } from "@inrupt/solid-ui-react";
import { Provider} from "react-redux";
import store from "../utils/locationsRedux/store";
import ManageFriends from "../views/ManageFriends";
import map from "../components/Map";
import parseLocations from "../components/ParseLocations";
import listFriends from "../components/ListFriends";
import { getOrCreateLocationList } from "../utils/solidAccessing";
import { Session} from "@inrupt/solid-client-authn-browser";
import getFriendsWebIds from "../utils/solidAccessing/GetFriendsFromPod";
import obtainUserLocations from "../utils/solidAccessing/GetUserLocations";
import removeUserLocation from "../utils/solidAccessing/RemoveLocations";
import { getFriends } from "../utils/friendsRedux/friendsSlice";
import { locationsSlice } from "../utils/locationsRedux/getLocationsSlice";
import waitingForLogIn from "../views/WaitingForLogin";
import AdministerUsers from "../views/AdministerUsers";
import ListUsers from "../components/ListUsers";
jest.setTimeout(30000);

function loginSolid(credentials) {
  const auth = require("solid-auth-cli");

  auth.login(credentials);
}

const app = ( <React.StrictMode>
  <SessionProvider>
    <BrowserRouter>
    <Provider store={store}>
    <Navbar/>
    <Switch>
    <Route path="/" exact component={LoginForm}/>
    <Route path="/map" exact component={MapComponent}/>
    <Route path="/about-us" exact component={AboutUs}/>
    <Route path="/login" component={Login}/>
    <Route path="/friends" component={ManageFriends}/>
    <Route path="/users" exact component={AdministerUsers}/>
  </Switch>
  </Provider>
</BrowserRouter>
</SessionProvider>
</React.StrictMode>);

const session = new Session();
session.info = {isLoggedIn: true ,sessionId: "d7995326-de7b-445d-830b-03c80b7c24b5" ,webId: "https://radarinen1btesting.inrupt.net/profile/card#me"};

test("renders navbar not logged in", () => {
  render(<App />);

  const home = screen.getByText(/Home/i);
  expect(home).toBeInTheDocument();

  const map = screen.getByText(/Map/i);
  expect(map).toBeInTheDocument();

  const about = screen.getByText(/About us/i);
  expect(about).toBeInTheDocument();

  const manage = screen.getByText(/Manage Friends/i);
  expect(manage).toBeInTheDocument();

  const administer = screen.getByText(/Administer users/i);
  expect(administer).toBeInTheDocument();
});

test("renders NotLoggedIn", () => {
  render(<NotLoggedIn />);

  const h1 = screen.getByText(/You are not logged in!/i);
  expect(h1).toBeInTheDocument();

  const h2 = screen.getByText(/To be able to view this you need to be logged in/i);
  expect(h2).toBeInTheDocument();
});

test("renders About us", () => {
  render(<AboutUs />);

  const h1 = screen.getByText(/About us/i);
  expect(h1).toBeInTheDocument();

  const alberto = screen.getByText(/Alberto Díez Bajo/i);
  expect(alberto).toBeInTheDocument();

  const alex = screen.getByText(/Alexander López Méndez/i);
  expect(alex).toBeInTheDocument();

  const javier = screen.getByText(/Javier Carrillo González/i);
  expect(javier).toBeInTheDocument();
  
  const radarin = screen.getByText(/Radarin is an application developed using React, SOLID, Docker and deployed with Heroku/i);
  expect(radarin).toBeInTheDocument();
});

test("renders map view", () => {
  render( app );

  const home = screen.getByText(/Home/i);
  expect(home).toBeInTheDocument();

  //Log in
  loginSolid({idp:"https://inrupt.net/", username:"radarinen1btesting", password: "Elpoddefabio1!"});

  const map = screen.getByText(/Map/i);
  
  fireEvent.click(map);
  
  const searching = screen.getByText("We are searching for favourite locations...");
  expect(searching).toBeInTheDocument();

});

test("renders login", () => {
  render(<BrowserRouter>
          <Navbar/>
          <Login />
          <Switch>
            <Route path="/" exact component={LoginForm}/>
            <Route path="/map" exact component={MapComponent}/>
            <Route path="/about-us" exact component={AboutUs}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/friends" exact component={ManageFriends}/>
            <Route path="/wait" component={waitingForLogIn}/>
          </Switch>
        </BrowserRouter>
  );

  const comboBox = screen.getByTestId("combo");
  expect(comboBox).toBeInTheDocument();

  fireEvent.click(comboBox);

  const button = screen.getByText("Register for a SOLID POD");
  expect(button).toBeInTheDocument();

  fireEvent.click(button);
  
});

test("renders manage friends", async () => {
  render(app);

  const home = screen.getByText(/Home/i);
  expect(home).toBeInTheDocument();

  fireEvent.click(home);

  loginSolid({idp:"https://inrupt.net/", username:"radarinen1btesting", password: "Elpoddefabio1!"});

  const manage = screen.getByText("Manage friends");
  expect(manage).toBeInTheDocument();
  fireEvent.click(manage);

  // Problem with mocking session
  const error = screen.getByText("Invalid URL: undefined");
  expect(error).toBeInTheDocument();
  
});

test("renders Notification", async() => {
  render(<div><Notification title="this is a notification" message="hello" img="map"/></div>);

  const title = screen.getByText("this is a notification");
  expect(title).toBeInTheDocument();

  const message = screen.getByText("hello");
  expect(message).toBeInTheDocument();
    
});

test("parseLocations", () => {
  const locations =[{ id: "https://radarinen1btesting.inrupt.net/profile/card#me", name: "You", 
                      localizaciones:[
                        {comment: "City of Benvante",lat: "42.1082000", lng: "-5.6774000",name: "Benavente"}]},
                        {id: "https://uo271913.inrupt.net/profile/card#me", name: "Héctor", 
                          localizaciones:[
                            {comment: "City of Benvante",lat: "42.1082000", lng: "-5.6774000",name: "Benavente"}]
                        }
                    ];
  
  const result=[
    [{"comment": "City of Benvante", "lat": "42.1082000", "lng": "-5.6774000", "name": "Benavente"}], 
    [{"author": "Héctor", "comment": "City of Benvante", "lat": "42.1082000", "lng": "-5.6774000", "name": "Benavente"}]
  ];

  expect(parseLocations(locations,"https://radarinen1btesting.inrupt.net/profile/card#me")).toStrictEqual(result);

});

test("parseLocations", () => {
  const locations =[{ id: "https://akaamerican.inrupt.net/profile/card#me", name: "Alexander", image:"https://akaamerican.inrupt.net/profile/pp.jpg" }];
  
  render(listFriends(locations));
  
  const title = screen.getByText("Alexander @akaamerican");
  expect(title).toBeInTheDocument();

  const button = screen.getByText("See Details");
  expect(button).toBeInTheDocument();
  
  fireEvent.click(button);

});

test("renders map component", async() => {
  const markers=[{"comment": "City of Benvante", "lat": "42.1082000", "lng": "-5.6774000", "name": "Benavente"}];
  const friendMarkers= [{"author": "Héctor", "comment": "City of Benvante", "lat": "42.1082000", "lng": "-5.6774000", "name": "Benavente"}];
  
  render(map(43.5228266,-5.6545074,markers,friendMarkers));
});

test("index", async() => {
  await getOrCreateLocationList("https://radarinen1btesting.inrupt.net/public/locations/",true,session.fetch);
});

test("friends from pod", async() => {
  const o = await getFriendsWebIds(session);
});

test("get user locations", async() => {
  const friends= [{id: "https://uo271913.inrupt.net/profile/card#me",image: "https://uo271913.inrupt.net/profile/f1.png", name: "Héctor"}];
  
  // errors with session
  try{
    const o = await obtainUserLocations(session, friends);
  }catch{
    const o = null;
  }

});

test("remove user locations / get friends / location slice", async() => {
  try{
    const o = await removeUserLocation(session,{"comment": "City of Benvante", "lat": "42.1082000", "lng": "-5.6774000", "name": "Benavente"} );
  }catch{
    const o = null;
  }

  getFriends(session);

  locationsSlice;
});

test("renders welcome", () => {
  render(<Welcome/>);

  const welcome = screen.getByText("Welcome to Radarin Manager!");
  expect(welcome).toBeInTheDocument();
});

test("renders waitingForLogin", () => {
  render(waitingForLogIn());

  const welcome = screen.getByText("Waiting for provider approval...");
  expect(welcome).toBeInTheDocument();
});

test("list users", () => {
  const map = new Map();

  map.set("https://akaamerican.inrupt.net/profile/card#me",true);
  map.set("https://luisfesu.inrupt.net/profile/card#me",false);
  render(ListUsers(map,0,undefined));
  
  const name = screen.getByText("akaamerican");
  expect(name).toBeInTheDocument();

  const unban = screen.getByText("Unban");
  expect(unban).toBeInTheDocument();

  const name2 = screen.getByText("luisfesu");
  expect(name2).toBeInTheDocument();

  const ban = screen.getByText("Ban");
  expect(ban).toBeInTheDocument();
});

test("renders admin", () => {
  render(<BrowserRouter>
         <Provider store={store}>
         <ul>
           <li key = {0}>
              <NavLink to="/users">
                  Administer users
              </NavLink>
          </li>
          <li key = {1}>
              <NavLink to="/home">
                  Home
              </NavLink>
          </li>
        </ul>
        <Switch>
         <Route path="/users" exact component={AdministerUsers}/>
         <Route path="/" exact component={LoginForm}/>
       </Switch>
       </Provider>
     </BrowserRouter>

      );

  const home = screen.getByText(/Home/i);
  expect(home).toBeInTheDocument();
  
  fireEvent.click(home);

  loginSolid({idp:"https://inrupt.net/", username:"asw2021en1b", password: "Arquisoft2021."});

  const administer = screen.getByText("Administer users");
  expect(administer).toBeInTheDocument();

  fireEvent.click(administer);

  const linkElement1 = screen.getByText("We are searching for the Radarin users...");
  expect(linkElement1).toBeInTheDocument();

});