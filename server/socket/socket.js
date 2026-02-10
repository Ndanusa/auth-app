// sockets/index.js
import { Server } from "socket.io";
import Message from "../models/message.models.js";

const initSocket = (server) => {
   const io = new Server(server, {
      cors: {
         origin: "*",
         methods: ["GET", "POST"],
      },
   });

   io.on("connection", (socket) => {
      console.log("Socket connected:", socket.id);

      socket.on("send_message", (data) => {
         console.log(data);
         io.emit("receive_message", data);
      });

      socket.on("disconnect", () => {
         console.log("Socket disconnected:", socket.id);
      });
   });

   return io;
};

export default initSocket;
