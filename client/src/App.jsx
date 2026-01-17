import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import {useState} from "react";

function App() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const DATABASE_URL = 'http://localhost:4400'
    const token = localStorage.getItem("token");
    async function authenticate() {
        const body = {}
        await fetch(`${DATABASE_URL}/api/v1/auth/me`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body,
        })
    }

   return (
      <Routes>
         <Route path="/" element={<Navigate to={token ? '/home' : '/login'} />} />
         <Route path="/login" element={<Login DATABASE_URL={DATABASE_URL}/>} />
         <Route path="/signup" element={<Signup />} />
         <Route path="/home" element={<Home />} />
      </Routes>
   );
}

export default App;
