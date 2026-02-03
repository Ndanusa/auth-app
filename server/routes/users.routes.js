import { Router } from "express";
import { getUsers, postUser } from "../controllers/users.controller.js";
const userRouter = Router();

userRouter.get("/user", getUsers);
userRouter.post("/get", postUser);

export default userRouter;
