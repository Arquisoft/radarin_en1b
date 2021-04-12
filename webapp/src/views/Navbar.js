<<<<<<< HEAD:webapp/src/views/Navbar.js
import {Component} from 'react';
import {MenuItems} from '../components/MenuItems';
import '../css/Navbar.css';
import { NavLink} from 'react-router-dom';
class Navbar extends Component{

    render(){
        return(
        <nav className="NavbarItems">
            <h1 className="navbar-logo">Radarin Manager <i className=" app-logo fab fa-react"></i></h1>
           
            <ul className="nav-menu">
              
                {MenuItems.map((item,index) => {
                    return (
                        <li key = {index}>
                            <NavLink to={item.url} className={item.cName} >
                                {item.title}
                            </NavLink>
                        </li>

                    )
                })}
            </ul>
        </nav>
        )
    }
}
=======
import {Component} from 'react';
import {MenuItems} from '../../components/MenuItems';
import '../../css/Navbar.css';
import { NavLink} from 'react-router-dom';
class Navbar extends Component{
    state ={clciked: false};

    handleClick = () => { 
        this.setState({ clicked: !this.state.clicked});
    }

    render(){
        return(
        <nav className="NavbarItems">
            <h1 className="navbar-logo">Radarin Radar <i className=" app-logo fab fa-react"></i></h1>
           
           <div className="menu-icon" onClick={this.handleClick}>
                <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
           </div>
           
            <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                {MenuItems.map((item,index) => {
                    return (
                        <li key = {index}>
                            <NavLink to={item.url} className={item.cName} onClick={this.handleClick}>
                                {item.title}
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        </nav>
        )
    }
}
>>>>>>> mobileapplication-developing-hector:mobileapplication/mobile-application/src/views/navbar/Navbar.js
export default Navbar