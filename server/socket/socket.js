// sockets/index.js
import { Server } from "socket.io";
import Message from "../models/message.models.js";
import mongoose from "mongoose";

const initSocket = async (server) => {
   const io = new Server(server, {
      cors: {
         origin: "*",
         methods: ["GET", "POST"],
      },
   });
   io.on("connection", async (socket) => {
      console.log("Socket connected:", socket.id);

      socket.on("join_room", (data) => {
         socket.join(data);
      });

      socket.on("send_private_messages", async (data) => {
         const message = {
            message: data.message,
            sender: data.sender,
            chatID: data.chatID,
            receiver: data.receiver,
         };
      });

      socket.on("request_global_messages", async (data) => {
         const messages = await Message.find({}).sort({ createdAt: 1 });
         socket.emit("get_messages", messages);
      });

      socket.on("send_global_message", async (data) => {
         const newMessage = await Message.create(data);
         const messages = await Message.find({}).sort({ createdAt: 1 });
         io.emit("receive_global_messages", messages);
      });

      socket.on("disconnect", () => {
         console.log("Socket disconnected:", socket.id);
      });
   });

   return io;
};

export default initSocket;
