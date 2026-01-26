import { Router } from "express";

const messageRoutes = Router();

messageRoutes.post("/messages", async (req, res) => {
   const { receiverId, content } = req.body;
   const senderId = req.user.id;
});
