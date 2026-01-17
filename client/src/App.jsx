import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { useEffect, useState } from "react";

function App() {
    const token = localStorage.getItem("token");
    const BACKEND_URL = 'http://localhost:4400/';
    useEffect(() => {
        fetch()
    })
   return (
      <Routes>
         <Route
            path="/"
            element={<Navigate to={token ? "/home" : "/login"} />}
         />
         <Route path="/login" element={<Login BACKEND_URL={BACKEND_URL} />} />
         <Route path="/signup" element={<Signup />} />
         <Route path="/home" element={<Home />} />
      </Routes>
   );
}

export default App;
