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
export default Navbar