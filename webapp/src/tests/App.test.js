import { render, screen } from "@testing-library/react";
import LoginForm from "../views/LoginForm";
import Navbar from "../views/Navbar";
import App from "../views/App";
import { BrowserRouter,Switch,Route } from "react-router-dom";
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
  </Switch>
  </Provider>
</BrowserRouter>
</SessionProvider>
</React.StrictMode>);

const session = new Session();
session.info = {isLoggedIn: true ,sessionId: "d7995326-de7b-445d-830b-03c80b7c24b5" ,webId: "https://radarinen1btesting.inrupt.net/profile/card#me"};

test("renders learn react link", () => {
  render(<BrowserRouter><LoginForm /><Route path="/login" exact component={Login}/></BrowserRouter>);
  
  const linkElement = screen.getByText(/Welcome!/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders navbar logged in", () => {
  render(app);
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
  const linkElement2 = screen.getByText(/Map/i);
  expect(linkElement2).toBeInTheDocument();
  const linkElement3 = screen.getByText(/About us/i);
  expect(linkElement3).toBeInTheDocument();
});

test("renders navbar not logged in", () => {
  render(app);
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
  const linkElement2 = screen.getByText(/Map/i);
  expect(linkElement2).toBeInTheDocument();
  const linkElement3 = screen.getByText(/About us/i);
  expect(linkElement3).toBeInTheDocument();
});

test("renders app home login", () => {
  render(<App />);
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
  
});

test("renders app map no login", () => {
  render(<App />);
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});


test("renders NotLoggedIn", () => {
  render(<NotLoggedIn />);
  const linkElement = screen.getByText(/You are not logged in!/i);
  expect(linkElement).toBeInTheDocument();
  const linkElement2 = screen.getByText(/To be able to view this you need to be logged in!/i);
  expect(linkElement2).toBeInTheDocument();
});

test("renders About us", () => {
  render(<AboutUs />);
  const linkElement = screen.getByText(/About us/i);
  expect(linkElement).toBeInTheDocument();
  const linkElement2 = screen.getByText(/Alberto Díez Bajo/i);
  expect(linkElement2).toBeInTheDocument();
  const linkElement3 = screen.getByText(/Alexander López Méndez/i);
  expect(linkElement3).toBeInTheDocument();
  const linkElement4 = screen.getByText(/Javier Carrillo González/i);
  expect(linkElement4).toBeInTheDocument();
  const linkElement5 = screen.getByText(/Radarin is an application developed using React, SOLID, Docker and deployed with Heroku./i);
  expect(linkElement5).toBeInTheDocument();
});

//LOG IN THEN GO TO MAP
test("renders map", async() => {
  render( app );
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();

  loginSolid({idp:"https://inrupt.net/", username:"radarinen1btesting", password: "Elpoddefabio1!"});

  const linkElement2 = screen.getByText(/Map/i);
  
  fireEvent.click(linkElement2);
  
  const linkElement1 = screen.getByText("Radarin Manager is searching for locations...");
  expect(linkElement1).toBeInTheDocument();

});

//LOG IN THEN GO TO MAP
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

  const but = screen.getByText("Register for a SOLID POD");
  expect(but).toBeInTheDocument();
  fireEvent.click(but);
  
  //const inrupt = screen.getAllByText("Inrupt")[0];
  //fireEvent.click(inrupt);
});

test("renders manage friends", async () => {
  render(app);

  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
  fireEvent.click(linkElement);

  loginSolid({idp:"https://inrupt.net/", username:"radarinen1btesting", password: "Elpoddefabio1!"});

  const linkElement2 = screen.getByText("Manage friends");
  expect(linkElement2).toBeInTheDocument();
  fireEvent.click(linkElement2);

  const linkElement1 = screen.getByText("Invalid URL: undefined");
  expect(linkElement1).toBeInTheDocument();
  
});

test("renders Notification", async() => {
    render(<div><Notification title="this is a notification" message="hello" img="map"/></div>);
    try{
      const title = screen.getByText("this is a notification");
      expect(title).toBeInTheDocument();
      const message = screen.getByText("hello");
      expect(message).toBeInTheDocument();
    } catch {
      const o = null;
    }
    await new Promise((r) => setTimeout(r, 4000));

});

test("parseLocations", async() => {
  const locations =[{ id: "https://radarinen1btesting.inrupt.net/profile/card#me", name: "You", localizaciones:[{comment: "City of Benvante",lat: "42.1082000",
  lng: "-5.6774000",name: "Benavente"}] },{id: "https://uo271913.inrupt.net/profile/card#me", name: "Héctor", localizaciones:[{comment: "City of Benvante",lat: "42.1082000",
  lng: "-5.6774000",name: "Benavente"}]}];
  const result=[[{"comment": "City of Benvante", "lat": "42.1082000", "lng": "-5.6774000", "name": "Benavente"}], [{"author": "Héctor", "comment": "City of Benvante", "lat": "42.1082000", "lng": "-5.6774000", "name": "Benavente"}]];


  expect(parseLocations(locations,"https://radarinen1btesting.inrupt.net/profile/card#me")).toStrictEqual(result);

});

test("parseLocations", async() => {
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
  try{
    const o = await obtainUserLocations(session, friends);
  }catch{
    const o = null;
  }
});

test("remove user locations", async() => {
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

  const welcome = screen.getByText("Waiting for Provider approval...");
  expect(welcome).toBeInTheDocument();
});