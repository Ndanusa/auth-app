import {PORT, DB_URI, NODE_ENV, JWT_SECRET, JWT_EXPIRES_IN} from "./config/env.js";
import connectDB from "./DATABASE/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";
import userRouter from "./routes/users.routes.js";
import subscriptionsRouter from "./routes/subscriptions.routes.js";
import express from "express";
import authRouter from "./routes/auth.routes.js"
import cors from "cors";
const app = express();
app.use(cors({origin: "*"}));
await connectDB();
app.use(express.json())
app.use(errorMiddleware)
//basic routes
app.use('/api/v1/auth', authRouter);
app.use('/user', userRouter)
app.use('/subscription', subscriptionsRouter)
app.use(express.json())


app.listen(PORT, () => {
   console.log("app is listening on http://localhost:" + PORT);
});
