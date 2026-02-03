import { Router } from "express";
import { sendMessage } from "../controllers/message.controller.js";
const messageRouter = Router();

messageRouter.post("/send", (req, res) => {
   res.json({
      message: "route working",
   });
});

export default messageRouter;
