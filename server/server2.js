import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
   cors: {
      origin: "*",
   },
});

app.use(express.json());
io.on("connection", (socket) => {
   console.log("user connected", socket.id);
   socket.on("userAction", (data) => {
      console.log("User did something", data);
      io.emit(
         ("liveUpdate",
         {
            message: "User action happened",
            payload: data,
         }),
      );
   });
   socket.on("disconnect", () => {
      console.log("user disconnected");
   });
});

server.listen(3000, () => {
   console.log("server is listening on port 3000");
});
