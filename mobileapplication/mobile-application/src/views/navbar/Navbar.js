import {Component} from 'react';
import {MenuItems} from '../../components/MenuItems';
import '../../css/Navbar.css';
import { NavLink} from 'react-router-dom';
class Navbar extends Component{
    state ={clciked: false};

    handleClick = () => { 
        this.setState({ clicked: !this.state.clicked});
    };

    render(){
        return(
        <nav className="NavbarItems">
            <h1 className="navbar-logo">Radarin Radar <i className=" app-logo fab fa-react"/></h1>
           
           <div className="menu-icon" onClick={this.handleClick}>
                <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
           </div>
           
            <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                {MenuItems.map((item,index) => {
                    return (
                        <li key = {index}  >
                            <a href={item.url} className={item.cName}>
                                <i  className={index === 0 ?'fas fa-home white '  :
                                    index === 1 ?  'fas fa-map white' :
                                    index === 2 ?  'fas fa-database white' :
                                    index === 3 ? 'fas fa-address-card white': null
                                }/>
                            <NavLink to={item.url} className='navText' onClick={this.handleClick}>
                                {item.title}
                            </NavLink>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
        )
    };
}
export default Navbar;