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

      const messages = await Message.find().select(
         "sender _id message createdAt",
      );
      socket.emit("recieve_messages", { messages });
      socket.on("send_message", async (data) => {
         const { message, sender } = data.message;
         const newMessage = await Message.create({
            message,
            sender,
         });
      });

      socket.on("disconnect", () => {
         console.log("Socket disconnected:", socket.id);
      });
   });

   return io;
};

export default initSocket;
