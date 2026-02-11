import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import axios from "axios";
import io from "socket.io-client";
import { BACKEND_URL } from "../config/config.js";

function Home(props) {
   const socketRef = useRef(null);

   const [message, setMessage] = useState("");
   const [users, setUsers] = useState([]);
   const [renderMsg, setRenderMsg] = useState([]);
   const [displayMsg, setDisplayMsg] = useState("");
   const [generalMsg, setGeneralMsg] = useState({
      error: false,
      message: "",
   });

   const user = props.validUser;

   /* -------------------- SOCKET SETUP -------------------- */
   useEffect(() => {
      socketRef.current = io("http://localhost:4400", {
         transports: ["websocket"],
      });

      socketRef.current.on("connect", () => {
         setDisplayMsg(`Connected as ${socketRef.current.id}`);
      });

      socketRef.current.on("load_brod", (data) => {
         setRenderMsg(data);
      });

      socketRef.current.on("receive_messages", (data) => {
         setRenderMsg(data);
      });

      return () => {
         socketRef.current.disconnect();
      };
   }, []);

   /* -------------------- FETCH USERS -------------------- */
   useEffect(() => {
      const getUsers = async () => {
         try {
            const res = await axios.get(`${BACKEND_URL}/api/v1/auth/user`);
            setUsers(res.data);
         } catch (err) {
            console.error(err);
         }
      };
      getUsers();
   }, []);

   /* -------------------- SEND MESSAGE -------------------- */
   const sendMessage = () => {
      const loggedUser = JSON.parse(localStorage.getItem("user"));

      if (!loggedUser) {
         return setGeneralMsg({
            error: true,
            message: "Please login to continue",
         });
      }

      if (!message.trim()) {
         return setGeneralMsg({
            error: true,
            message: "Message cannot be empty",
         });
      }

      socketRef.current.emit("send_message", {
         message,
         sender: loggedUser.id,
      });

      setMessage("");
   };

   /* -------------------- RENDER USERS -------------------- */
   const renderUsers = () =>
      users.map((item) => (
         <div
            key={item._id}
            className="bg-indigo-200 flex flex-col items-start w-59 px-3 sqc-lg py-1">
            <p className="text-lg text-zinc-900 font-semibold">
               {item.firstName} {item.lastName}
            </p>
            <p className="text-sm text-zinc-600">{item.username}</p>
         </div>
      ));

   /* -------------------- RENDER MESSAGES -------------------- */
   const renderMessages = () =>
      renderMsg.map((item) => {
         const isMe = item.sender === user.id;

         return (
            <div
               key={item._id}
               className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
               <div
                  className={`max-w-[70%] px-4 py-2 sqc-lg
              ${isMe ? "bg-indigo-200" : "bg-zinc-600"}
            `}>
                  <p
                     className={`text-sm font-bold ${
                        isMe ? "text-black" : "text-zinc-300"
                     }`}>
                     {item.message}
                  </p>
                  <p className="text-xs text-zinc-400">
                     {new Date(item.createdAt).toLocaleString()}
                  </p>
               </div>
            </div>
         );
      });

   return (
      <div className="flex h-screen">
         <div className="bg-indigo-50 p-5 px-10 w-80">
            <div className="bg-indigo-200 sqc-lg px-3 py-2 mb-5">
               <p className="text-lg font-black">
                  {user.firstName} {user.lastName}
               </p>
               <p className="text-sm text-zinc-500">{user.username}</p>
            </div>

            <h1 className="text-2xl font-bold mb-4">Users</h1>
            <div className="flex flex-col gap-3">{renderUsers()}</div>
         </div>

         <div className="flex-1 bg-zinc-300 p-4 flex flex-col">
            <h1 className="text-2xl font-bold">Messages</h1>
            <p className="text-sm text-zinc-600 mb-3">{displayMsg}</p>

            <div className="flex-1 overflow-y-auto flex flex-col gap-3 px-5">
               {renderMessages()}
            </div>

            <div className="flex gap-2 mt-3">
               <input
                  type="text"
                  className="flex-1 sqc-lg px-4 py-2 text-sm bg-gray-300 focus:outline-2"
                  placeholder="type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
               />
               <button
                  className="bg-zinc-700 sqc-lg px-5 py-2 text-white text-sm"
                  onClick={sendMessage}>
                  Send
               </button>
            </div>
         </div>
      </div>
   );
}

export default Home;
