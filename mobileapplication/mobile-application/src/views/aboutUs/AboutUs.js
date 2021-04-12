import React from 'react';

const AboutUs = props => {
  return (
    <div className="about-us">
      <h1>About us</h1>
      <p>We are the Radarin team, a team composed of 6 undergraduate students of Software Engineers:</p>
      <li>Alberto Díez Bajo</li>
      <li>Alexander López Méndez</li>
      <li>Daniel Barrientos Iglesias</li>
      <li>Héctor Fernández Maillo</li>
      <li>Javier Carrillo González</li>
      <li>Luis Antonio Fernández Suárez</li>
      <p>Together and with the help of our teacher Pablo González González have designed and developed Radarin,</p>
      <p>an application developed using React, SOLID, Docker and deployed with Heroku.</p>
      <p>Radarin is an application based on the use of location recording using PODs,</p>
      <p>where you can see yours and your friends locations</p>
    </div>
  );
};

export default AboutUs;
