

import Login from "./auth/login";
import Signup from "./auth/signup";
import {DataTableDemo} from "./pages/Scedule"
import { Route, Routes } from "react-router-dom";
import "./App.css";


import { Accueil } from "./pages/Accueil";
import { Calendrier } from "./pages/Calendrier";
import { Virement } from "./pages/Virement";
import { Profile } from "./pages/ProfileA";
import { useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { AddSeance } from "./pages/AddSeance";
import { NavbarA } from "./components/NavbarA";
import { ChangeVirement } from "./pages/VirementA";
import SignupAdmin from "./pages/member";
import { NavBar } from "./components/NavBar";


function App() {
  const auth = useAuth();
  return (
    <div className="App">
      {auth.isLoggedIn && <NavBar />}
      
      <NavbarA />
      
      <Routes>
        <Route path="Login" element={<Login />} />
        <Route path="Signup" element={<Signup />} />
        
        <Route path="Schedule" element={<DataTableDemo />} />
        <Route path="Seance" element={<AddSeance />} />
        <Route path="VirementA" element={<ChangeVirement />} />
        <Route path="Members" element={<SignupAdmin />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Accueil />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Calendrier"
          element={
            <ProtectedRoute>
              <Calendrier />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Virement"
          element={
            <ProtectedRoute>
              <Virement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
