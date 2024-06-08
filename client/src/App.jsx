import Login from "./auth/login";
import Signup from "./auth/signup";
import { DataTableDemo } from "./pages/Scedule";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import "../node_modules/react-grid-layout/css/styles.css";
import "../node_modules/react-resizable/css/styles.css";

import { Accueil } from "./pages/Accueil";
import { Calendrier } from "./pages/Calendrier";
import { Virement } from "./pages/Virement";
import { Profile } from "./pages/Profile";
import { useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { AddSeance } from "./pages/AddSeance";
import { ChangeVirement } from "./pages/VirementA";
import SignupAdmin from "./pages/member";
import { NavBar } from "./components/NavBar";
import { Toaster } from "./components/ui/sonner";
import ScheduleDetails from "./pages/scheduleDetails";
import { AddSchedule } from "./pages/AddSchedule";
import AdminRoute from "./components/AdminRoute";

function App() {
  const auth = useAuth();
  return (
    <div className="App">
      {auth.isLoggedIn && <NavBar />}

      <Routes>
        <Route path="Login" element={<Login />} />
        <Route path="Signup" element={<Signup />} />

        <Route
          path="/Schedule"
          element={
            <AdminRoute>
              <DataTableDemo />
            </AdminRoute>
          }
        />

        <Route
          path="/Add-Schedule"
          element={
            <AdminRoute>
              <AddSchedule />
            </AdminRoute>
          }
        />

        <Route
          path="/Schedule/:id"
          element={
            <AdminRoute>
              <ScheduleDetails />
            </AdminRoute>
          }
        />
        <Route
          path="/Seance/:id"
          element={
            <AdminRoute>
              <AddSeance />
            </AdminRoute>
          }
        />
        <Route
          path="Virement"
          element={
            <AdminRoute>
              <ChangeVirement />
            </AdminRoute>
          }
        />
        <Route
          path="Members"
          element={
            <AdminRoute>
              <SignupAdmin />
            </AdminRoute>
          }
        />
        <Route
          path="/"
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
          path="/Mon-Virement"
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
      <Toaster />
    </div>
  );
}

export default App;
