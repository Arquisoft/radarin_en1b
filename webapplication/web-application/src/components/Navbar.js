import {Component} from 'react';
import {MenuItems} from './MenuItems/MenuItems'
import {Button} from './MenuItems/Buttons'
import './MenuItems/Navbar.css'
class Navbar extends Component{

    render(){
        return(
        <nav className="NavbarItems">
            <h1 className="navbar-logo">Radarin Manager <i className="fab fa-react"></i></h1>
           
            <ul className="nav-menu">
                {MenuItems.map((item,index) => {
                    return (
                        <li key = {index}>
                            <a className={item.cName} href={item.url}>
                                {item.title}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </nav>
        )
    }
}
export default Navbar