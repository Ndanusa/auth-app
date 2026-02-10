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
         "_id sender message createdAt",
      );
      socket.broadcast.emit("load_brod", messages);
      socket.on("send_message", async (data) => {
         const { message, sender } = data.message;
         const newMessage = await Message.create({
            message,
            sender,
         });
         const messages = await Message.find().select(
            "_id sender message createdAt",
         );
         // socket.broadcast.emit("recieve_messages", messages);
         io.emit("receive_messages", messages);
      });

      socket.on("disconnect", () => {
         console.log("Socket disconnected:", socket.id);
      });
   });

   return io;
};

export default initSocket;
