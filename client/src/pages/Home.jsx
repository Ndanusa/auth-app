import { useEffect, useRef, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import { BACKEND_URL } from "../config/config.js";

function Home({ validUser }) {
   const socketRef = useRef(null);
   const bottomRef = useRef(null);

   const [users, setUsers] = useState([]);
   const [messages, setMessages] = useState([]);
   const [message, setMessage] = useState("");
   const [status, setStatus] = useState("");

   /* ---------------- SOCKET ---------------- */
   useEffect(() => {
      socketRef.current = io("http://localhost:4400", {
         transports: ["websocket"],
      });

      socketRef.current.on("connect", () => {
         setStatus("Connected");
      });

      socketRef.current.on("load_brod", setMessages);
      socketRef.current.on("receive_messages", setMessages);

      return () => socketRef.current.disconnect();
   }, []);

   /* ---------------- AUTO SCROLL ---------------- */
   useEffect(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [messages]);

   /* ---------------- FETCH USERS ---------------- */
   useEffect(() => {
      const getUsers = async () => {
         const res = await axios.get(`${BACKEND_URL}/api/v1/auth/user`);
         setUsers(res.data);
      };
      getUsers();
   }, []);

   /* ---------------- SEND MESSAGE ---------------- */
   const sendMessage = () => {
      if (!message.trim()) return;

      socketRef.current.emit("send_message", {
         message,
         sender: validUser.id,
      });

      setMessage("");
   };

   /* ---------------- RENDER ---------------- */
   return (
      <div className="flex h-screen bg-white text-black">
         {/* USERS SIDEBAR */}
         <aside className="w-80 bg-white border-r border-gray-200 p-5">
            <div className="bg-gray-100 rounded-lg px-3 py-2 mb-5 shadow-sm">
               <p className="font-bold">
                  {validUser.firstName} {validUser.lastName}
               </p>
               <p className="text-sm text-gray-600">{validUser.username}</p>
            </div>

            <h2 className="text-lg font-bold mb-3">Users</h2>
            <div className="flex flex-col gap-2">
               {users.map((u) => (
                  <div
                     key={u._id}
                     className="bg-gray-100 hover:bg-gray-200 rounded-lg px-3 py-2 cursor-pointer transition-colors">
                     <p className="font-semibold">
                        {u.firstName} {u.lastName}
                     </p>
                     <p className="text-sm text-gray-600">{u.username}</p>
                  </div>
               ))}
            </div>
         </aside>

         {/* CHAT SECTION */}
         <main className="flex-1 relative flex flex-col bg-white">
            {/* GLASS HEADER */}
            <div className="absolute top-0 left-0 right-0 z-20 bg-white/30 backdrop-blur-md border-b border-gray-300 px-4 py-3">
               <h1 className="text-xl font-bold text-indigo-900">Messages</h1>
               <p className="text-sm text-gray-700">{status}</p>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto px-4 pt-20 pb-24 flex flex-col gap-3">
               {messages.map((msg) => {
                  const isMe = msg.sender === validUser.id;
                  return (
                     <div
                        key={msg._id}
                        className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                        <div
                           className={`max-70 px-4 py-2 sqc-lg shadow-sm
                  ${isMe ? "bg-indigo-100 text-black" : "bg-gray-800 text-white"}
                `}>
                           <p className="text-sm font-medium">{msg.message}</p>
                           <p className="text-xs mt-1 text-gray-500">
                              {new Date(msg.createdAt).toLocaleTimeString()}
                           </p>
                        </div>
                     </div>
                  );
               })}
               <div ref={bottomRef} />
            </div>

            {/* GLASS INPUT */}
            <div className="absolute bottom-0 left-0 right-0 z-20 bg-white/30 backdrop-blur-md border-t border-gray-300 px-4 py-3">
               <div className="flex gap-2">
                  <input
                     type="text"
                     className="flex-1 rounded-lg px-4 py-2 bg-white/60 text-black text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 focus:ring-offset-white/20 transition-all duration-200"
                     placeholder="Type a message..."
                     value={message}
                     onChange={(e) => setMessage(e.target.value)}
                     onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  />
                  <button
                     className="bg-indigo-700 text-white px-5 py-2 rounded-lg hover:bg-indigo-800 transition-colors"
                     onClick={sendMessage}>
                     Send
                  </button>
               </div>
            </div>
         </main>
      </div>
   );
}

export default Home;
