

import { Route, Routes } from "react-router-dom";
import "./App.css";
import { NavBar } from "./componments/NavBar";
import { Accueil } from "./pages/Accueil";
import { Calendrier } from "./pages/Calendrier";
import { Virement } from "./pages/Virement";
import { Notifications } from "./pages/Notifications";
import { Profile } from "./pages/Profile";




function App() {

  return (
    <div className="App">
      <NavBar/> 
      <Routes>
        <Route path="/dashboard" element={<Accueil/>}/>
        <Route path="/Calendrier" element={<Calendrier/>}/>
        <Route path="/Virement" element={<Virement/>}/>
        <Route path="/Notifications" element={<Notifications/>}/>
        <Route path="/Profile" element={<Profile/>}/>

      
      </Routes>
      
     
    </div>
  );
}

export default App;
