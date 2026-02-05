import { Router } from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";

const messageRouter = Router();

messageRouter.post("/send", sendMessage);
messageRouter.get("/render", getMessages);

export default messageRouter;
