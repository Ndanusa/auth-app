import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { HugeiconsIcon } from "@hugeicons/react";
import { SearchIcon, Home01Icon } from "@hugeicons/core-free-icons";
import io from "socket.io-client";
import { BACKEND_URL } from "../config/config.js";
const socket = io("http://localhost:3000");
function Home() {
   const [message, setMessage] = useState("");
   const [users, setUsers] = useState([]);
   console.log(users);
   const getUsers = async () => {
      const response = await fetch(`${BACKEND_URL}/api/v1/auth/user`);
      const result = await response.json();
      setUsers(result);
   };
   useEffect(() => {
      getUsers();
      socket.on("liveUpdate", (data) => {
         console.log("Update received", data);
      });
      return () => socket.off("liveUpdate");
   }, []);
   const sendMessage = () => {
      if (message === "") return;
      socket.emit("userAction", { message });
   };
   return (
      <>
         <div className="flex items-center">
            <div className="">
               <h1>Users</h1>
            </div>
            <div className="flex items-center justify-center flex-col">
               <input
                  type="text"
                  className="sqc-lg px-4 py-1 placeholder:text-sm text-sm bg-gray-300 focus:outline-2"
                  placeholder="type a message..."
                  onChange={(e) => {
                     const value = e.target.value;
                     setMessage(value);
                  }}
               />
               <button
                  onClick={sendMessage}
                  className="text-sm cursor-pointer bg-zinc-700 sqc-lg px-5 py-1 text-white">
                  Send
               </button>
            </div>
         </div>
      </>
   );
}

export default Home;
