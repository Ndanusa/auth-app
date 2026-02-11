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

   /* ---------------- SOCKET (CLEAN LIFECYCLE) ---------------- */
   useEffect(() => {
      socketRef.current = io("http://localhost:4400", {
         transports: ["websocket"],
      });

      socketRef.current.on("connect", () => {
         setStatus("Connected");
      });

      socketRef.current.on("load_brod", setMessages);
      socketRef.current.on("receive_messages", setMessages);

      return () => {
         socketRef.current.disconnect();
      };
   }, []);

   /* ---------------- AUTO SCROLL (SMOOTH) ---------------- */
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
      <div className="flex h-screen">
         {/* USERS */}
         <aside className="w-80 bg-indigo-50 p-5">
            <div className="bg-indigo-200 sqc-lg px-3 py-2 mb-5">
               <p className="font-bold">
                  {validUser.firstName} {validUser.lastName}
               </p>
               <p className="text-sm text-zinc-600">{validUser.username}</p>
            </div>

            <h2 className="text-xl font-bold mb-3">Users</h2>
            <div className="flex flex-col gap-3">
               {users.map((u) => (
                  <div key={u._id} className="bg-indigo-200 sqc-lg px-3 py-2">
                     <p className="font-semibold">
                        {u.firstName} {u.lastName}
                     </p>
                     <p className="text-sm text-zinc-600">{u.username}</p>
                  </div>
               ))}
            </div>
         </aside>

         {/* CHAT */}
         <main className="flex-1 bg-zinc-300 flex flex-col relative">
            {/* GLASS HEADER (OVERLAY) */}
            <div className="absolute top-0 left-0 right-0 z-20 bg-white/30 backdrop-blur-md border-b border-white/20 px-4 py-3">
               <h1 className="text-2xl font-bold">Messages</h1>
               <p className="text-sm text-zinc-600">{status}</p>
            </div>

            {/* MESSAGES (SCROLL UNDER HEADER) */}
            <div className="flex-1 overflow-y-auto px-4 pt-20 pb-4 flex flex-col gap-3">
               {messages.map((msg) => {
                  const isMe = msg.sender === validUser.id;

                  return (
                     <div
                        key={msg._id}
                        className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                        <div
                           className={`max-w-[70%] px-4 py-2 sqc-lg ${
                              isMe ? "bg-indigo-200" : "bg-zinc-600"
                           }`}>
                           <p
                              className={`text-sm font-semibold ${
                                 isMe ? "text-black" : "text-zinc-200"
                              }`}>
                              {msg.message}
                           </p>
                           <p className="text-xs text-zinc-400 mt-1">
                              {new Date(msg.createdAt).toLocaleTimeString()}
                           </p>
                        </div>
                     </div>
                  );
               })}
               <div ref={bottomRef} />
            </div>

            {/* INPUT */}
            <div className="p-4 flex gap-2 bg-zinc-300">
               <input
                  type="text"
                  className="flex-1 sqc-lg px-4 py-2 bg-gray-200 text-sm focus:outline-none"
                  placeholder="type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
               />
               <button
                  className="bg-zinc-700 text-white px-5 py-2 sqc-lg"
                  onClick={sendMessage}>
                  Send
               </button>
            </div>
         </main>
      </div>
   );
}

export default Home;
