import Login from "./auth/login";
import Signup from "./auth/signup";

import { Route, Routes } from "react-router-dom";
import "./App.css";
import { NavBar } from "./components/NavBar";
import { Accueil } from "./pages/Accueil";
import { Calendrier } from "./pages/Calendrier";
import { Virement } from "./pages/Virement";
import { Profile } from "./pages/Profile";
import { useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const auth = useAuth();
  return (
    <div className="App">
      {auth.isLoggedIn && <NavBar />}
      <Routes>
        <Route path="Login" element={<Login />} />
        <Route path="Signup" element={<Signup />} />
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
