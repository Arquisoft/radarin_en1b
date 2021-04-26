import React from 'react';
import { Figure } from 'react-bootstrap';
//import getPhoto from '../utils/solidAccessing/ObtainImage';
import userPhoto from '../static/user.svg';
import '../css/Navbar.css'
export default function Profile ({session}) {

    return <Figure className='figure-adjust'> 
        <Figure.Image
            width={60}
            height={60}
            alt=""
            src={userPhoto}
        />
    </Figure>;
}
/*
async function getImage(session){
    let img;
    await getPhoto(session).then( obj  => { img = obj });
    return img;
}
*/