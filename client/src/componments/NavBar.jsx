import React, {useState} from "react";
import { Link, NavLink } from "react-router-dom";
import image from '../images/esi.png';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"


import "./NavBar.css";

export const NavBar = () => {

    const [menuOpen, setMenuOpen] = useState(false)

return (
    <nav  className="w-full border-b-2 border-blue-500">
        <Link to="/dashboard" className="title"><img src={image} className=" p-2 h-20 w-20" alt=""
                     /></Link>
        <div className="menu" onClick={() => {
            setMenuOpen(!menuOpen);
        }}>
            <span></span>
            <span></span>
            <span></span>
            
        </div>
       <ul className={menuOpen ? "open" : ""}>
        <li> <NavLink to="/dashboard" >Accueil </NavLink></li>
        <li> <NavLink to="/Calendrier">Calendrier</NavLink></li>
        <li> <NavLink to="/Virement">Virement </NavLink></li>
        
        <li> <NavLink to="Profile">Profile</NavLink></li>
        <li> <NavLink to="/" > <AlertDialog>
  <AlertDialogTrigger>Logout</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
      <AlertDialogDescription>
      This will end your current session and you will need to log in again to
        access your account.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Logout</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog> </NavLink>
      </li>
       </ul>
    </nav>
);
};