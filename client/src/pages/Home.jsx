import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import { HugeiconsIcon } from "@hugeicons/react";
import { SearchIcon, Home01Icon } from "@hugeicons/core-free-icons";
import io from "socket.io-client";
import axios from "axios";
import { BACKEND_URL } from "../config/config.js";
function Home(props) {
   const [message, setMessage] = useState("");
   const [users, setUsers] = useState([]);
   const [renderMsg, setRenderMsg] = useState([]);
   const [postData, setPostData] = useState([]);
   const [generalMsg, setGeneralMsg] = useState({
      error: false,
      message: "",
   });
   const [displayMsg, setDisplayMsg] = useState("father");
   const socket = io("http://localhost:4400");
   const user = props.validUser;
   console.log(user);
   useEffect(() => {
      socket.on("load_brod", (data) => {
         setRenderMsg(data);
      });
   }, []);

   useEffect(() => {
      socket.on("connect", () => {
         setDisplayMsg(`you connected with id: ${socket.id}`);
      });

      socket.on("receive_messages", (data) => {
         setRenderMsg(data);
      });
   }, []);
   const getUsers = async () => {
      const response = await axios.get(`${BACKEND_URL}/api/v1/auth/user`);
      console.log(response.data);
      setUsers(response.data);
   };

   const sendMessage = () => {
      const loggedUser = JSON.parse(localStorage.getItem("user"));
      const sender = loggedUser.id;
      if (!message)
         return setGeneralMsg({
            error: true,
            message: "message cannot be empty",
         });
      if (!loggedUser)
         return setGeneralMsg({
            error: true,
            message: "Please login to continue",
         });
      const body = { message, sender };
      // socket.emit("send_message", { message: body });
      setMessage("");
   };
   useEffect(() => {
      getUsers();
   }, []);
   const renderUsers = () => {
      const display = users.map((item) => {
         return (
            <div
               key={item.username}
               className="bg-indigo-200 flex flex-col items-start w-59 px-3 sqc-lg py-1">
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
   const renderMessage = () => {
      if (renderMsg.length === 0) return "";
      return renderMsg.map((item) => {
         return (
            <div
               key={`${item._id}`}
               className="bg-indigo-200 w-60 px-4 py-2 sqc-tbl-lg">
               <p className="text-black text-sm">{item.message}</p>
               <p className="text-xs text-zinc-500">{item.createdAt}</p>
            </div>
         );
      });
   };
   return (
      <>
         <div className="flex items-start justify-between h-screen">
            <div className="h-screen bg-indigo-50 p-5 px-10">
               <h1 className="text-2xl font-bold px-3 py-4">Users</h1>
               <div className="flex flex-col gap-3">{renderUsers()}</div>
            </div>
            <div className="">
               <h1 className="text-2xl font-bold">Messages</h1>
               <div>{displayMsg}</div>
               <div className="flex flex-col gap-3">{renderMessage()}</div>
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
               <button
                  className="text-sm cursor-pointer bg-zinc-700 sqc-lg px-5 py-1 text-white"
                  onClick={sendMessage}>
                  Send
               </button>
            </div>
         </div>
      </>
   );
}

export default Home;
