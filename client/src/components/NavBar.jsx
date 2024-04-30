import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import "./NavBar.css";
import { useAuth } from "@/contexts/AuthContext";

export const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const auth = useAuth();

  return (
    <nav>
      <Link to="/dashboard" className="title">
        LOGO
      </Link>
      <div
        className="menu"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/dashboard">Accueil </NavLink>
        </li>
        <li>
          <NavLink to="/Calendrier">Calendrier</NavLink>
        </li>
        <li>
          <NavLink to="/Virement">Virement </NavLink>
        </li>
        <li>
          <NavLink to="Profile">Profile</NavLink>
        </li>
        <li className="cursor-pointer" onClick={auth.logout}>
          Logout
        </li>
      </ul>
    </nav>
  );
};
