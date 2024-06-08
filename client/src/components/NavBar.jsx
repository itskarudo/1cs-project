import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import image from "../images/esi.png";

import "./NavBar.css";
import { useAuth } from "@/contexts/AuthContext";

export const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const auth = useAuth();

  return (
    <nav>
      <Link to="/" className="title">
        <img src={image} className=" p-2 h-20 w-20" alt="" />
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
      <ul className={menuOpen ? "open" : " font-semibold text-lg "}>
        {auth.authData.role === "admin" && (
          <>
            <li>
              <NavLink to="/Schedule">Schedules</NavLink>
            </li>
            <li>
              <NavLink to="/Members">Members</NavLink>
            </li>
            <li>
              <NavLink to="/Virement">Payments</NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink to="/Calendrier">Calendar</NavLink>
        </li>
        <li>
          <NavLink to="/Mon-Virement">My Payment</NavLink>
        </li>
        <li>
          <NavLink to="/Profile">Profile</NavLink>
        </li>
        <li className="cursor-pointer" onClick={auth.logout}>
          Logout
        </li>
      </ul>
    </nav>
  );
};
