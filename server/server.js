import { PORT, DB_URI, NODE_ENV } from "./config/env.js";
import connectDB from "./DATABASE/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";
import express from "express";
import userRoutes from "./routes/users.routes.js";
import subscriptionRoutes from "./routes/subscriptions.routes.js";
const app = express();
app.use(errorMiddleware)





app.listen(PORT, () => {
   console.log("app is listening on http://localhost:" + PORT);
});
