import { PORT, DB_URI, NODE_ENV } from "./config/env.js";
import connectDB from "./DATABASE/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";
import userRouter from "./routes/users.routes.js";
import subscriptionsRouter from "./routes/subscriptions.routes.js";
import express from "express";
const app = express();
app.use(errorMiddleware)
app.use('/user', userRouter)
app.use('/subscription', subscriptionsRouter)

app.listen(PORT, () => {
   console.log("app is listening on http://localhost:" + PORT);
});
