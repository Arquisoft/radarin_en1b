import {Component} from 'react';
import {MenuItems} from '../../components/MenuItems';
import '../../css/Navbar.css';
import { NavLink} from 'react-router-dom';
class Navbar extends Component{

    render(){
        return(
        <nav className="NavbarItems">
            <h1 className="navbar-logo">Radarin Radar <i className=" app-logo fab fa-react"></i></h1>
           
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
export default Navbar