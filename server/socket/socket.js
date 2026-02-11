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

      socket.on("request_messages", async (data) => {
         const messages = await Message.find({}).sort({ createdAt: 1 });
         socket.emit("load_brod", messages);
      });

      socket.on("send_message", async (data) => {
         const newMessage = await Message.create(data);
         const messages = await Message.find({}).sort({ createdAt: 1 });
         io.emit("receive_messages", messages);
      });

      socket.on("disconnect", () => {
         console.log("Socket disconnected:", socket.id);
      });
   });

   return io;
};

export default initSocket;
