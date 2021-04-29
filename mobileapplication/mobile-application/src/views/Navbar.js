import {Component} from "react";
import {MenuItems} from "../components/MenuItems";
import "../css/Navbar.css";
import { NavLink} from "react-router-dom";
import logo from "../static/radarin-radar.png"
class Navbar extends Component{
    state ={clciked: false};

    handleClick = () => { 
        this.setState({ clicked: !this.state.clicked});
    };

    render(){
        return(
        <nav id='nav' className="NavbarItems">
            <div className='navbar-logo'>
                <img src={logo} alt='Radarin radar logo'className='navbar-logo'/>
            </div>
           <div className="menu-icon" onClick={this.handleClick}>
                <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
           </div>
           
            <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
                {MenuItems.map((item,index) => {
                    return (
                        <li key = {index}  className="nav-links">
                            <NavLink to={item.url} className="navText" onClick={this.handleClick}>
                                <i  className={item.cName}/>
                                {item.title}
                            </NavLink>
                        </li>
                    );
                })}
                
            </ul>
        </nav>
        );
    }
}
export default Navbar;