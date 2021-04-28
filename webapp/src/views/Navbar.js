import {MenuItems} from "../components/MenuItems";
import "../css/Navbar.css";
import { NavLink} from "react-router-dom";

function Navbar(){
    return <nav className="NavbarItems">

        <ul className="nav-menu">
            
            {MenuItems.map((item,index) => {
                return (
                    <li key = {index}>
                        <NavLink to={item.url} className='nav-links' data-testid={item.title}>
                            <i className={item.cName} />
                            {item.title}
                        </NavLink>
                    </li>
                );
            })}
            
        </ul>
    </nav>;
}

export default Navbar;