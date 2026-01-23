import User from "../models/user.models.js";

export const getUsers = async (req, res) => {
   const users = await User.find().select("name username _id");
   res.json(users);
};
