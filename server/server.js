import {PORT, DB_URI, NODE_ENV, JWT_SECRET, JWT_EXPIRES_IN} from "./config/env.js";
import connectDB from "./DATABASE/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";
import userRouter from "./routes/users.routes.js";
import subscriptionsRouter from "./routes/subscriptions.routes.js";
import express from "express";
import bcrypt from "bcryptjs";
import authRouter from "./routes/auth.routes.js"

const app = express();

app.use(errorMiddleware)
//basic routes
app.use('/api/v1/auth', authRouter);
app.use('/user', userRouter)
app.use('/subscription', subscriptionsRouter)
app.use(express.json())
app.post('/', async (req, res) => {
   const password = req.body.password
   const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(password, salt)
   res.send(hashedPassword)
})

app.listen(PORT, () => {
   console.log("app is listening on http://localhost:" + PORT);
});
