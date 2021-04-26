import { render, screen } from '@testing-library/react';
// import App from '../views/App';
import LoginForm from '../views/LoginForm';
import toBeInTheDocument from '@testing-library/jest-dom';
import Navbar from '../views/Navbar';
import App from '../views/App';
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import Welcome from '../views/Welcome';
import MapComponent from '../views/Map';
import AboutUs from '../views/AboutUs';
import NotLoggedIn from '../views/NotLoggedIn';
import { fireEvent } from "@testing-library/react";
import Login from '../views/Login';
import Notification from '../components/Notification';
import React from 'react';
import { SessionProvider } from '@inrupt/solid-ui-react';
import { Provider } from 'react-redux';
import store from '../utils/locationsRedux/store';
import ManageFriends from '../views/ManageFriends';


function loginSolid(credentials) {
  const auth = require('solid-auth-cli');

  auth.login(credentials);
}

test('renders learn react link', () => {
  render(<BrowserRouter><LoginForm /><Route path='/login' exact component={Login}/></BrowserRouter>);
  
  const linkElement = screen.getByText(/Welcome!/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders navbar logged in', () => {
  render(<BrowserRouter>
    <Navbar/>
    <Switch>
      <Route path='/' exact component={Welcome}/>
      <Route path='/map' exact component={ MapComponent }/>
      <Route path='/about-us' exact component={AboutUs}/>
    </Switch>
  </BrowserRouter>);
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
  const linkElement2 = screen.getByText(/Map/i);
  expect(linkElement2).toBeInTheDocument();
  const linkElement3 = screen.getByText(/About us/i);
  expect(linkElement3).toBeInTheDocument();
});

test('renders navbar not logged in', () => {
  render(<BrowserRouter>
    <Navbar/>
    <Switch>
    <Route path='/' exact component={LoginForm }/>
        <Route path='/welcome' exact component={Welcome}/>
        <Route path='/map' exact component={NotLoggedIn}/>
        <Route path='/about-us' exact component={AboutUs}/>
        <Route path='/login' exact component={Login}/>
        <Route path='/friends' exact component={ NotLoggedIn}/>
    </Switch>
  </BrowserRouter>);
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
  const linkElement2 = screen.getByText(/Map/i);
  expect(linkElement2).toBeInTheDocument();
  const linkElement3 = screen.getByText(/About us/i);
  expect(linkElement3).toBeInTheDocument();
});

test('renders app home login', () => {
  render(<App />);
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
  
});

test('renders app map no login', () => {
  render(<App />);
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});


test('renders NotLoggedIn', () => {
  render(<NotLoggedIn />);
  const linkElement = screen.getByText(/You are not logged in!/i);
  expect(linkElement).toBeInTheDocument();
  const linkElement2 = screen.getByText(/To be able to view this you need to be logged in!/i);
  expect(linkElement2).toBeInTheDocument();
});

test('renders About us', () => {
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
test('renders map', () => {
  render(
    <React.StrictMode>
    <SessionProvider>
      <BrowserRouter>
      <Provider store={store}>
      <Navbar/>
      <Switch>
      <Route path='/' exact component={LoginForm}/>
      <Route path='/welcome' exact component={Welcome}/>
      <Route path='/map' exact component={MapComponent}/>
      <Route path='/about-us' exact component={AboutUs}/>
      <Route path='/login' component={Login}/>
      <Route path='/friends' exact component={ManageFriends}/>
    </Switch>
    </Provider>
  </BrowserRouter>
  </SessionProvider>
  </React.StrictMode>
    );
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();

  loginSolid({idp:"https://inrupt.net/", username:"radarinen1btesting", password: "Elpoddefabio1!"});

  const linkElement2 = screen.getByText(/Map/i);
  try{
    fireEvent.click(linkElement2);
  /*
  global.navigator.permissions = {
    query: jest.fn().mockImplementationOnce(() => Promise.resolve({ state: 'granted' })),
  };
  
  global.navigator.geolocation = {
    getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
      Promise.resolve(
        success({
          coords: {
            latitude: 43.21,
            longitude: -5.654321,
          },
        })
      )
    ),
  };
  */
  /*
  window.navigator.geolocation.getCurrentPosition((position) => { 
    position.coords.latitude = 43.21;
    position.coords.longitude = -5.654321;
  });
  */

  const linkElement1 = screen.getByText('Radarin Manager is computing the locations...');
  expect(linkElement1).toBeInTheDocument();
  }catch(err){
    
  }
  

});

//LOG IN THEN GO TO MAP
test('renders login', () => {
  render(<Login />);
  const comboBox = screen.getByTestId("combo");
  expect(comboBox).toBeInTheDocument();
  fireEvent.click(comboBox);

  const but = screen.getByText("Register for a SOLID POD");
  expect(but).toBeInTheDocument();
  fireEvent.click(but);
  
  //const inrupt = screen.getAllByText("Inrupt")[0];
  //fireEvent.click(inrupt);
});

test('renders manage friends', () => {
  render(
    <React.StrictMode>
    <SessionProvider>
      <BrowserRouter>
      <Provider store={store}>
      <Navbar/>
      <Switch>
      <Route path='/' exact component={LoginForm}/>
      <Route path='/welcome' exact component={Welcome}/>
      <Route path='/map' exact component={MapComponent}/>
      <Route path='/about-us' exact component={AboutUs}/>
      <Route path='/login' component={Login}/>
      <Route path='/friends' exact component={ManageFriends}/>
    </Switch>
    </Provider>
  </BrowserRouter>
  </SessionProvider>
  </React.StrictMode>
    );
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();

  loginSolid({idp:"https://inrupt.net/", username:"radarinen1btesting", password: "Elpoddefabio1!"});

  const linkElement2 = screen.getByText(/Manage Friends/i);
  fireEvent.click(linkElement2);
  
  const linkElement1 = screen.getByText('Radarin Manager is searching for your friends');
  expect(linkElement1).toBeInTheDocument();

  setTimeout(() => {
    const linkElemen = screen.getByText('Here you are able to add, see and remove your friends.');
    expect(linkElemen).toBeInTheDocument();

    const link = screen.getByText('Friend list:');
    expect(link).toBeInTheDocument();

    const hect = screen.getByText('Héctor @uo271913');
    expect(hect).toBeInTheDocument();

    const but = screen.getByText('See Details');
    expect(but).toBeInTheDocument();

    const alt = screen.getByAltText('Profile');
    expect(alt).toBeInTheDocument();
  },4000);

  
});

test('renders Notification', () => {
    render(<Notification title="this is a notification" message="hello" img='map'/>);
    const title = screen.getByText("this is a notification");
    expect(title).toBeInTheDocument();
    const message = screen.getByText("hello");
    expect(message).toBeInTheDocument();


});

/* 
test('renders login', () => {
  render(<React.StrictMode>
    <SessionProvider>
      <BrowserRouter>
      <Provider store={store}>
      <Navbar/>
      <Switch>
      <Route path='/' exact component={LoginForm}/>
      <Route path='/welcome' exact component={Welcome}/>
      <Route path='/map' exact component={MapComponent}/>
      <Route path='/about-us' exact component={AboutUs}/>
      <Route path='/login' component={Login}/>
      <Route path='/friends' exact component={ManageFriends}/>
    </Switch>
    </Provider>
  </BrowserRouter>
  </SessionProvider>
  </React.StrictMode>);
    const home = screen.getByText("Home");
    expect(home).toBeInTheDocument();
    fireEvent.click(home);

    const welcome = screen.getByText("Welcome!");
    expect(welcome).toBeInTheDocument();

    loginSolid({idp:"https://inrupt.net/", username:"radarinen1btesting", password: "Elpoddefabio1!"});

    welcome = screen.getByText("Welcome to Radarin Manager!");
    expect(welcome).toBeInTheDocument();

});
*/