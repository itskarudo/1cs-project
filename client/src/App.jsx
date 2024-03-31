import { Routes ,Route } from "react-router-dom";
import "./App.css";
import Login from "./auth/login";
import Signup from "./auth/signup";

function App() {
  return (
  
<Routes>
  <Route path="Login" element={<Login/>}/>
  <Route path="Signup" element={<Signup/>}/>
</Routes>
  
   
  
 
  );
  }

export default App;
