import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { useEffect, useState } from "react";w
import { BACKEND_URL } from "./config/config";
function App() {
   const [isAuth, setIsAuth] = useState(false);
   const [loading, setLoading] = useState(true);
   const token = localStorage.getItem("token");
   useEffect(() => {
      if (!token) {
         return setLoading(false);
      }
      fetch(`${BACKEND_URL}/api/v1/auth/protected`, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      })
         .then((res) => {
            if (!res.ok) throw new Error("Unauthorized");
            return res.json();
         })
         .then(() => {
            setIsAuth(true);
         })
         .catch(() => {
            localStorage.removeItem("token");
            setIsAuth(false);
         })
         .finally(() => setLoading(false));
   }, [token]);

   if (loading) {
      return <p>Checking Authentication...</p>;
   }
   return (
      <Routes>
         <Route
            path="/"
            element={<Navigate to={isAuth ? "/home" : "/login"} />}
         />
         <Route
            path="/login"
            element={isAuth ? <Navigate to={"/home"} /> : <Login />}></Route>
         <Route path="/signup" element={<Signup />} />
         {/* <Route path="/home" element={<Home />} /> */}
         <Route path="/home" element={isAuth ? <Home /> : <Login />} />
      </Routes>
   );
}

export default App;
