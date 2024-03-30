import React, {useState} from "react";
import { Link, NavLink } from "react-router-dom";

import "./NavBar.css";

export const NavBar = () => {

    const [menuOpen, setMenuOpen] = useState(false)

return (
    <nav>
        <Link to="/" className="title">LOGO</Link>
        <div className="menu" onClick={() => {
            setMenuOpen(!menuOpen);
        }}>
            <span></span>
            <span></span>
            <span></span>
            
        </div>
       <ul className={menuOpen ? "open" : ""}>
        <li> <NavLink to="/" >Accueil </NavLink></li>
        <li> <NavLink to="/Calendrier">Calendrier</NavLink></li>
        <li> <NavLink to="/Virement">Virement </NavLink></li>
        <li> <NavLink to="Notifications">Notifications </NavLink></li>
        <li> <NavLink to="Profile">Profile</NavLink></li>
       </ul>
    </nav>
);
};