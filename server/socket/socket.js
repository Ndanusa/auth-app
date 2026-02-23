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
    socket.on("join_global", () => {
      socket.join("global");
    });

    socket.on("request_global_messages", async () => {
      const messages = await Message.find({ type: "global" }).sort({
        createdAt: 1,
      });
      socket.emit("load_global", messages);
    });
    socket.on("join_private", (chatId) => {
      socket.join(chatId);
    });

    socket.on("delete_message", async (data) => {
      await Message.deleteOne({ _id: data._id });
      if (data.type === "global") {
        const messages = await Message.find({ type: "global" }).sort({
          createdAt: 1,
        });
        io.to("global").emit("receive_global_messages", messages);
      }
      if (data.type === "private") {
        const messages = await Message.find({
          type: "private",
          chatId: data.chatId,
        }).sort({ createdAt: 1 });
        io.to(data.chatId).emit("receive_private_messages", messages);
      }
    });

    socket.on("request_private_messages", async (chatId) => {
      const messages = await Message.find({
        type: "private",
        chatId,
      }).sort({ createdAt: 1 });

      socket.emit("load_private", messages);
    });

    socket.on("send_message", async (data) => {
      const newMessage = await Message.create(data);

      if (data.type === "global") {
        const messages = await Message.find({ type: "global" }).sort({
          createdAt: 1,
        });
        io.to("global").emit("receive_global_messages", messages);
      }
      if (data.type === "private") {
        const messages = await Message.find({
          type: "private",
          chatId: data.chatId,
        }).sort({ createdAt: 1 });
        io.to(data.chatId).emit("receive_private_messages", messages);
      }
    });

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.id);
    });
  });

  return io;
};

export default initSocket;
