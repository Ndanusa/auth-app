import { PORT } from "./config/env.js";
import errorMiddleware from "./middleware/error.middleware.js";
import userRouter from "./routes/users.routes.js";
import subscriptionsRouter from "./routes/subscriptions.routes.js";
import express from "express";
import connectDB from "./DATABASE/mongodb.js";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import protectedRoutes from "./routes/protected.routes.js";
import messageRouter from "./routes/message.routes.js";
import http from "http";
import initSocket from "./socket/socket.js";

const app = express();
const server = http.createServer(app);

// Socket.IO
await initSocket(server);
// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

await connectDB();

app.use("/public", express.static("public"));

// Routes
app.use("/api/v1/auth", userRouter);
app.use("/api/v1/auth", protectedRoutes);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/message", messageRouter);
app.use("/subscription", subscriptionsRouter);

// Error handler
app.use(errorMiddleware);

// Server start
server.listen(PORT, () => {
  console.log("API + Socket.IO running on http://localhost:" + PORT);
});
