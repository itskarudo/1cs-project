import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import image from '../images/esi.png';

import "./NavBar.css";
import { useAuth } from "@/contexts/AuthContext";
import { Profile } from "@/pages/ProfileA";

export const NavbarA = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const auth = useAuth();

  return (
    <nav className="w-full border-b-2 border-blue-500">
      
      <Link to="/Schedule" className="title">
      <img src={image} className=" p-2 h-20 w-20" alt=""
                     />
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
      <ul className={menuOpen ? "open" : " font-semibold text-lg " }>
        <li>
          <NavLink to="/Schedule">Accueil </NavLink>
        </li>
        <li>
          <NavLink to="/Members">Members </NavLink>
        </li>
        <li>
          <NavLink to="/VirementA">Virement </NavLink>
        </li>
        <li>
          <Profile/>
        </li>
        
        <li className="cursor-pointer" onClick={auth.logout}>
          Logout
        </li>
        
      </ul>
    </nav>
  );
};
