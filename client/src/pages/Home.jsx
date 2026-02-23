import { useEffect, useRef, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import { BACKEND_URL } from "../config/config.js";
import { HugeiconsIcon } from "@hugeicons/react";
import { MoreVertical } from "@hugeicons/core-free-icons";

function Home({ validUser }) {
  const socketRef = useRef(null);
  const bottomRef = useRef(null);
  const chatID = useRef(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  /* ---------------- SOCKET ---------------- */
  useEffect(() => {
    socketRef.current = io(BACKEND_URL, {
      transports: ["websocket"],
    });

    socketRef.current.on("connect", () => {
      setStatus("Connected");
      socketRef.current.emit("join_global");
      socketRef.current.emit("request_global_messages");
      socketRef.current.emit("request_global_update");
    });

    socketRef.current.on("load_global", setMessages);
    socketRef.current.on("receive_global_messages", setMessages);

    socketRef.current.on("load_private", setMessages);
    socketRef.current.on("receive_private_messages", setMessages);

    socketRef.current.on("disconnect", () => {
      setStatus("Disconnected");
    });

    return () => socketRef.current.disconnect();
  }, []);

  /* ---------------- AUTO SCROLL ---------------- */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const closeMenu = () => setOpenMenuId(null);
    window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, []);
  /* ---------------- FETCH USERS ---------------- */
  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get(`${BACKEND_URL}/api/v1/auth/user`);
      setUsers(res.data);
    };
    getUsers();
  }, []);

  const openPrivateChat = (user) => {
    setCurrentUser(user);
    chatID.current = [user._id, validUser.id].sort().join("_");
    console.log(user);
    setMessages([]);
    socketRef.current.emit("join_private", chatID.current);
    socketRef.current.emit("request_private_messages", chatID.current);
  };

  /* ---------------- SEND MESSAGE ---------------- */
  function sendMessage() {
    if (!message.trim()) return;
    if (chatID.current && currentUser) {
      socketRef.current.emit("send_message", {
        type: "private",
        message,
        sender: validUser.id,
        receiver: currentUser?._id,
        chatId: chatID.current,
      });
    } else {
      socketRef.current.emit("send_message", {
        type: "global",
        sender: validUser.id,
        message,
      });
    }

    setMessage("");
  }

  return (
    <div className="flex h-screen bg-white text-black">
      {/* USERS SIDEBAR */}
      <aside className="w-80 border-r border-gray-200 p-5">
        <div className="bg-gray-100 sqc-lg px-3 py-2 mb-5">
          <p className="font-bold">
            {validUser.firstName} {validUser.lastName}
          </p>
          <p className="text-sm text-gray-600">{validUser.username}</p>
        </div>

        <h2 className="text-lg font-bold mb-3">Users</h2>
        <div className="flex flex-col gap-2">
          <div
            className="bg-gray-100 sqc-lg px-3 py-2 font-semibold"
            onClick={() => {
              setCurrentUser(null);
              chatID.current = null;
              setMessages([]);
              socketRef.current.emit();
              socketRef.current.emit("join_global");
              socketRef.current.emit("request_global_messages");
            }}>
            Global
          </div>

          {users.map((u) => (
            <div
              key={u._id}
              className="bg-gray-100 sqc-lg px-3 py-2"
              onClick={() => {
                openPrivateChat(u);
              }}>
              <p className="font-semibold">
                {u.firstName} {u.lastName}
              </p>
              <p className="text-sm text-gray-600">{u.username}</p>
            </div>
          ))}
        </div>
      </aside>

      {/* CHAT SECTION */}
      <main className="flex-1 relative flex flex-col">
        {/* HEADER */}
        <div className="absolute top-0 left-0 right-0 z-20 bg-indigo-100/30 backdrop-blur-md border-b px-4 py-3">
          <div>
            {currentUser ? (
              <div>
                <p className="text-xl">
                  {currentUser.firstName} {currentUser.lastName}
                </p>
                <div className="text-gray-700 text-sm flex items-center gap-2">
                  {currentUser.username}{" "}
                  <div
                    className={`w-2 h-2 rounded-full ${status ? "bg-[#04ff00]" : "bg-red-500"}`}></div>
                </div>
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                Global{" "}
                <div
                  className={`w-2 h-2 rounded-full ${status ? "bg-[#00ff1a]" : "bg-red-500"}`}></div>
              </div>
            )}
          </div>
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
                  className={`relative max-w-[70%] px-4 py-2 sqc-lg ${
                    isMe ? "bg-indigo-100 text-black" : "bg-gray-800 text-white"
                  }`}>
                  {/* MESSAGE MENU ICON */}
                  <div
                    className="absolute top-2 right-2 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === msg._id ? null : msg._id);
                    }}>
                    <HugeiconsIcon
                      icon={MoreVertical}
                      size={15}
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* POPUP MENU */}
                  {openMenuId === msg._id && (
                    <div
                      className={`absolute z-30 ${
                        isMe ? "right-6" : "left-6"
                      } top-8 bg-white text-black border sqc-lg shadow-lg w-32`}>
                      <button
                        className="w-full px-3 py-2 text-left hover:bg-gray-100 border-b-zinc-900"
                        onClick={() => {
                          navigator.clipboard.writeText(msg.message);
                          setOpenMenuId(null);
                        }}>
                        Copy
                      </button>

                      <button
                        className={`w-full px-3 py-2 text-left transition-all duration-200 hover:bg-gray-100 ${isMe && "border-b"}`}
                        onClick={() => {
                          console.log("Reply:", msg._id);
                          setOpenMenuId(null);
                        }}>
                        Reply
                      </button>
                      {isMe && (
                        <button
                          className="w-full px-3 py-2 text-left text-red-600 hover:bg-red-50"
                          onClick={() => {
                            if (msg.type === "private") {
                              socketRef.current.emit("delete_message", msg);
                              socketRef.current.emit(
                                "request_private_messages",
                                chatID.current,
                              );
                            } else if (msg.type === "global") {
                              socketRef.current.emit("delete_message", msg);
                              socketRef.current.emit(
                                "request_global_messages",
                                chatID.current,
                              );
                            }
                            setOpenMenuId(null);
                          }}>
                          Delete
                        </button>
                      )}
                    </div>
                  )}

                  <p className="text-sm font-medium pr-6">{msg.message}</p>
                  <p className="text-xs mt-1 text-gray-500">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* INPUT */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/30 backdrop-blur-md border-t px-4 py-3">
          <div className="flex gap-2">
            <input
              className="flex-1 sqc-lg px-4 py-2"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              className="bg-indigo-700 text-white px-5 py-2 sqc-lg"
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
