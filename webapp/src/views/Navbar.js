import '../css/Navbar.css';
import { NavLink} from 'react-router-dom';
const Navbar = () => {
        return(
        <nav className="NavbarItems">
            <h1 className="navbar-logo">Radarin Manager <i className=" app-logo fab fa-react"></i></h1>
           
            <ul className="nav-menu">
                <li>
                    <NavLink to={'/'} className='nav-links' >
                        <i className='fas fa-home white'/>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/map'} className='nav-links' >
                        <i className='fas fa-map white'/>
                        Map
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/about-us'} className='nav-links' >
                        <i className='fas fa-address-card white'/>
                        About us
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/docs'} className='nav-links' >
                        <i className='fas fa-book-reader white'/>
                        Documentation
                    </NavLink>
                </li>
            </ul>
        </nav>
        );
}
export default Navbar;