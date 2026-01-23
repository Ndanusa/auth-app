import mongoose from "mongoose";
import User from "../models/user.models";

export const getUsers = async (req, res) => {
   const users = await User.find().select("name username _id");

   users.map((item) => {
      if (item._id) {
         res.send(item._id);
      }
   });
};
