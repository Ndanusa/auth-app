const io = require("socket.io")(5500, {
   cors: {
      origin: "*",
   },
});
const mongoose = require("mongoose");

async function connectDB() {
   try {
      await mongoose.connect();
      console.log("database connected");
   } catch (error) {
      console.log(`error connecting to database: ${error}`);
      process.exit(1);
   }
}

io.on("connection", (socket) => {
   console.log(socket.id);
   socket.on("send-message", (message) => {
      console.log(message);
   });
});
