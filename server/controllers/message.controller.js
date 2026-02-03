import mongoose from "mongoose";
import Message from "../models/message.models.js";

export const sendMessage = (req, res) => {
   res.json({
      message: "Route is working",
   });
};
