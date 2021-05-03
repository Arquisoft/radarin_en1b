import {MenuItems} from "../components/MenuItems";
import "../css/Navbar.css";
import { NavLink} from "react-router-dom";
import {useState} from "react";
import {useSession} from "@inrupt/solid-ui-react/dist";
import { isAdmin } from "../api/api";

function Navbar(){
    const [admin, setAdmin] = useState(false);

    const {session} = useSession();

    session.onLogin(async () => {
        let adm = await isAdmin(session.info.webId);
        setAdmin(adm);
    });

    return <nav className="NavbarItems">

        <ul className="nav-menu">
            
            {MenuItems.map((item,index) => {
                return ((item.title !== "Administer users" || admin)?
                    <li key = {index}>
                        <NavLink to={item.url} className='nav-links' data-testid={item.title}>
                            <i className={item.cName} />
                            {item.title}
                        </NavLink>
                    </li>:
                    <li key = {index}>
                    </li>
                );
            })}
            
        </ul>
    </nav>;
}

export default Navbar;