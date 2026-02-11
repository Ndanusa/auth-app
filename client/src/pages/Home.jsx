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
   useEffect(() => {
      socketRef.current = io("http://localhost:4400", {
         transports: ["websocket"],
      });

      socketRef.current.on("connect", () => {
         setDisplayMsg(`Connected with id: ${socketRef.current.id}`);
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
   const getUsers = async () => {
      try {
         const response = await axios.get(`${BACKEND_URL}/api/v1/auth/user`);
         setUsers(response.data);
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      getUsers();
   }, []);

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

      const body = {
         message,
         sender: loggedUser.id,
      };

      socketRef.current.emit("send_message", body);
      setMessage("");
   };

   const renderUsers = () => {
      if (users.length === 0) return null;

      return users.map((item) => (
         <div
            key={item._id}
            className="bg-indigo-200 flex flex-col items-start w-59 px-3 sqc-lg py-1">
            <p className="text-lg text-zinc-900">
               {item.firstName} {item.lastName}
            </p>
            <p className="text-sm text-zinc-600">{item.username}</p>
         </div>
      ));
   };

   const renderMessage = () => {
      if (renderMsg.length === 0) return null;

      return renderMsg.map((item) => (
         <div
            key={item._id}
            className={` w-60 px-4 py-2 sqc-lg relative ${item.sender === user.id ? "left-0 bg-indigo-200" : "left-0 bg-zinc-600"} `}>
            <p
               className={`${item.sender !== user.id ? "text-zinc-300" : "text-black"} text-sm font-bold`}>
               {item.message}
            </p>
            <p
               className={`${item.sender !== user.id ? "text-zinc-400" : "text-zinc-400"} text-sm`}>
               {new Date(item.createdAt).toLocaleString()}
            </p>
         </div>
      ));
   };

   return (
      <div className="flex items-start h-screen">
         <div className="h-screen bg-indigo-50 p-5 px-10">
            <div
               className={`bg-indigo-200 flex flex-col items-start w-59 px-3 sqc-lg py-1`}>
               <p className="text-lg text-zinc-900 font-black">
                  {user.firstName} {user.lastName}
               </p>
               <p className="text-sm text-zinc-500 font-semibold">
                  {user.username}
               </p>
            </div>
            <h1 className="text-2xl font-bold px-3 py-4">Users</h1>
            <div className="flex flex-col gap-3">{renderUsers()}</div>
         </div>
         <div className="bg-zinc-300 flex-1">
            <h1 className="text-2xl font-bold">Messages</h1>
            <p className="text-sm text-zinc-600">{displayMsg}</p>
            <div className="flex flex-col gap-3 mt-3 relative bg-zinc-300">
               {renderMessage()}
            </div>
         </div>

         <div className="flex items-center justify-center flex-col">
            <input
               type="text"
               className="sqc-lg px-4 py-1 placeholder:text-sm text-sm bg-gray-300 focus:outline-2"
               placeholder="type a message..."
               value={message}
               onChange={(e) => setMessage(e.target.value)}
            />
            <button
               className="mt-2 text-sm cursor-pointer bg-zinc-700 sqc-lg px-5 py-1 text-white"
               onClick={sendMessage}>
               Send
            </button>
         </div>
      </div>
   );
}

export default Home;
