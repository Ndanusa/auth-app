import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { HugeiconsIcon } from "@hugeicons/react";
import { SearchIcon, Home01Icon } from "@hugeicons/core-free-icons";
import io from "socket.io-client";
import { BACKEND_URL } from "../config/config.js";
// const socket = io("http://localhost:3000", {
//    auth: {
//       token: localStorage.getItem("token"),
//    },
// });
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
      // io().on("connection", (socket) => {
      //    console.log("user connected", socket.userId);
      //    socket.join(socket.userId);
      //    socket.on("disconnect", () => {
      //       console.log("User Disconnected", socket.userId);
      //    });
      // });
   }, []);
   // const sendMessage = () => {
   //    if (message === "") return;
   //    setMessage("");
   // };
   const renderUsers = () => {
      const display = users.map((item) => {
         return (
            <div key={item.username}>
               <p className="text-lg text-zinc-900">{item.name}</p>
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
