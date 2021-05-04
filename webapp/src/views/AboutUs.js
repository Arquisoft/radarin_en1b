import { Col, Container, Row } from "react-bootstrap";
import alex from "../static/developers/alex.jpg";
import hector from "../static/developers/Hector.jpg";
import alberto from "../static/developers/Alberto.jpg";
import daniel from "../static/developers/Daniel.jpg";
import javier from "../static/developers/Javier.jpg";
import luis from "../static/developers/luis.jpg";
import "../css/App.css";

export default function AboutUs(){
  return <div className="about-us">
      <div className='margin-top overflow-auto'>
        <h1>About us</h1>
        <br/>
        <p>We are the Radarin team, a team composed of 6 undergraduate students of Software Engineering:</p>
        <Container fluid="md" >
                      <Row className='margin-bot'>
                          <Col ><div><img src={alberto} className='imagen' alt=''/></div><a href="https://github.com/uo266536" target="_blank" rel="noreferrer" className='decoration-none' alt="Image">Alberto Díez Bajo</a></Col>
                          <Col><div><img src={alex} className='imagen' alt=''/></div><a href="https://github.com/UO266499" target="_blank" rel="noreferrer" className='decoration-none' alt="Image">Alexander López Méndez</a></Col>
                          <Col><div><img src={daniel} className='imagen' alt=''/></div><a href="https://github.com/DaniBAIG7" target="_blank" rel="noreferrer" className='decoration-none' alt="Image">Daniel Barrientos Iglesias</a></Col>
                      </Row>
                      <Row className='margin-bot'>
                          <Col><div><img src={hector} className='imagen' alt=''/></div><a href="https://github.com/uo271913" target="_blank" rel="noreferrer" className='decoration-none' alt="Image">Héctor Fernández Maillo</a></Col>
                          <Col><div><img src={javier} className='imagen' alt=''/></div><a href="https://github.com/uo269412" target="_blank" rel="noreferrer"className='decoration-none' alt="Image">Javier Carrillo González</a></Col>
                          <Col><div><img src={luis} className='imagen' alt=''/></div><a href="https://github.com/luisfesu" target="_blank" rel="noreferrer" className='decoration-none' alt="Image">Luis Antonio Fernández Suárez</a></Col>
                      </Row>
        </Container>
        <p>Together and with the help of our teacher Pablo González González have designed and developed Radarin</p>
        <p>Radarin is an application developed using React, SOLID, Docker and deployed with Heroku</p>
        <p>It is an application based on the use of location recording using PODs, where you can see yours and your friends' locations</p>
        <p>You can read the documentation <a href="https://radarinen1bwebapp.herokuapp.com/docs/" target="_blank" rel="noreferrer">here</a></p>
      </div>
    </div>;
}