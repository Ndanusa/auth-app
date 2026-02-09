import {
   PORT,
   DB_URI,
   NODE_ENV,
   JWT_SECRET,
   JWT_EXPIRES_IN,
} from "./config/env.js";
import errorMiddleware from "./middleware/error.middleware.js";
import userRouter from "./routes/users.routes.js";
import subscriptionsRouter from "./routes/subscriptions.routes.js";
import express from "express";
import connectDB from "./DATABASE/mongodb.js";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import protectedRoutes from "./routes/protected.routes.js";
import messageRouter from "./routes/message.routes.js";
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());
await connectDB();
app.use(errorMiddleware);
import { io } from "socket.io";

const socketIO = io(5500, {
   cors: {
      origin: "*",
   },
});

socketIO.on("connection", (socket) => {
   console.log(socket.id);
   socket.on("send-message", (message) => {
      console.log(message);
   });
});

app.use("/public", express.static("public"));
//basic routes
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/auth", protectedRoutes);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/message", messageRouter);
app.use("/subscription", subscriptionsRouter);
app.use(express.json());

app.listen(PORT, () => {
   console.log("app is listening on http://localhost:" + PORT);
});
