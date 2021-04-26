import {MenuItems} from '../components/MenuItems';
import '../css/Navbar.css';
import { NavLink} from 'react-router-dom';
import Profile from '../components/Profile';

function Navbar({logged,session}){
    return <nav className="NavbarItems">

        <ul className="nav-menu">
            
            {MenuItems.map((item,index) => {
                return (
                    <li key = {index}>
                        <NavLink to={item.url} className='nav-links' >
                            <i className={item.cName} />
                            {item.title}
                        </NavLink>
                    </li>
                )
            })}
        {logged && <li><Profile session={session}/></li>}
            
        </ul>
    </nav>;
}

export default Navbar;