import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { HugeiconsIcon } from "@hugeicons/react";
import { SearchIcon, Home01Icon } from "@hugeicons/core-free-icons";
import io from "socket.io-client";
import axios from "axios";
import { BACKEND_URL } from "../config/config.js";
import { data } from "react-router-dom";
function Home() {
   const [message, setMessage] = useState("");
   const [users, setUsers] = useState([]);
   const [postData, setPostData] = useState([]);
   const getUsers = async () => {
      const response = await axios.get(`${BACKEND_URL}/api/v1/auth/user`);
      console.log(response.data);
      setUsers(response.data);
   };
   useEffect(() => {
      getUsers();
   }, []);
   const renderUsers = () => {
      const display = users.map((item) => {
         return (
            <div key={item.username}>
               <p className="text-lg text-zinc-900">
                  {item.firstName} {item.lastName}
               </p>
               <p className="text-sm text-zinc-600">{item.username}</p>
            </div>
         );
      });
      if (users.length === 0) return "";
      return display;
   };
   return (
      <>
         <div className="flex items-start justify-between h-screen">
            <div className="">
               <h1>Users</h1>
               <div>{renderUsers()}</div>
            </div>
            <div className="flex items-center justify-center flex-col content-end">
               <input
                  type="text"
                  className="sqc-lg px-4 py-1 placeholder:text-sm text-sm bg-gray-300 focus:outline-2"
                  placeholder="type a message..."
                  onChange={(e) => {
                     const value = e.target.value;
                     setMessage(value);
                  }}
                  value={message}
               />
               <button className="text-sm cursor-pointer bg-zinc-700 sqc-lg px-5 py-1 text-white">
                  Send
               </button>
            </div>
         </div>
      </>
   );
}

export default Home;
