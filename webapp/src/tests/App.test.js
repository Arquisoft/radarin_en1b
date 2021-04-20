import { render, screen } from '@testing-library/react';
// import App from '../views/App';
import LoginForm from '../views/LoginForm';
import {toBeInTheDocument} from '@testing-library/jest-dom';
import Navbar from '../views/Navbar';
import App from '../views/App';
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import Welcome from '../views/Welcome';
import MapComponent from '../views/Map';
import AboutUs from '../views/AboutUs';
import NotLoggedIn from '../views/NotLoggedIn';
import { fireEvent } from "@testing-library/react";

test('renders learn react link', () => {
  render(<LoginForm />);
  const linkElement = screen.getByText(/Welcome to Radarin Manager/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders navbar logged in', () => {
  render(<BrowserRouter>
    <Navbar/>
    <Switch>
      <Route path='/' exact component={Welcome}/>
      <Route path='/map' exact component={ MapComponent }/>
      <Route path='/about-us' exact component={AboutUs}/>
      <Route path='/docs' component={() => { 
        window.location.href = 'https://radarinen1bwebapp.herokuapp.com/docs/';
      }}/>
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
      <Route path='/' exact component={Welcome}/>
      <Route path='/map' exact component={ NotLoggedIn }/>
      <Route path='/about-us' exact component={AboutUs}/>
      <Route path='/docs' component={() => { 
        window.location.href = 'https://radarinen1bwebapp.herokuapp.com/docs/';
      }}/>
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
  const linkElement2 = screen.getByText("Log In");
  fireEvent.click(linkElement2);
  setTimeout(() => {
    const linkElement3 = screen.getByText("Login");
    expect(linkElement3).toBeInTheDocument();
  }, 5000);
  
});

test('renders app map no login', () => {
  render(<App />);
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
  const linkElement2 = screen.getByText(/Log In/i);
  expect(linkElement2).toBeInTheDocument();
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
  const linkElement5 = screen.getByText(/Radarin is an application based on the use of location recording using PODs/i);
  expect(linkElement5).toBeInTheDocument();
});

//LOG IN THEN GO TO MAP
test('renders map', () => {
  render(<App />);
  const linkElement = screen.getByText(/Log In/i);
  fireEvent.click(linkElement);
  setTimeout(() => {
    const linkElement3 = screen.getByText("Login");
    expect(linkElement3).toBeInTheDocument();
    fireEvent.click(linkElement3);

    const linkElement2 = screen.getByText(/Map/i);
    fireEvent.click(linkElement2);

    const linkElement1 = screen.getByText('Radarin Radar is computing the locations...');
    expect(linkElement1).toBeInTheDocument();
  }, 5000);
  
});
