import mongoose from "mongoose";
import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import connectDB from "../DATABASE/mongodb.js";
export const signUp = async (req, res, next) => {
   const session = await mongoose.startSession();
   session.startTransaction();
   try {
      const { name, username, email, password } = req.body;
      const existingEmail = await User.findOne({ email });

      if (existingEmail) {
         const error = new Error("Email not avaliable");
         error.status = 401;
         throw error;
      }

      const existingUsername = await User.findOne({ username });

      if (existingUsername) {
         const error = new Error("username not avaliab;e");
         error.status = 401;
         throw error;
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await User.create([
         { name, username, email, password: hashedPassword },
         { session },
      ]);
      const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, {
         expiresIn: JWT_EXPIRES_IN,
      });
      await session.commitTransaction();
      res.status(201).json({
         message: "user created successfully.",
         status: true,
         data: {
            token,
            user: newUser[0],
         },
      });
   } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      next(error);
   }
};

export const signIn = async (req, res, next) => {
   try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
         const error = new Error("User not found");
         res.status(404).json({
            error: error.message,
            status: false,
            type: "email",
         });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
         const error = new Error("Incorrect password");
         res.status(404).json({
            error: error.message,
            status: false,
            type: "password",
         });
      }
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
         expiresIn: JWT_EXPIRES_IN,
      });
      res.status(201).json({
         success: true,
         message: "User logged in successfully.",
         data: {
            token,
            user: {
               email: user.email,
               _id: user._id,
               name: user.name,
               username: user.username,
            },
         },
      });
   } catch (error) {
      next(error);
   }
};
export const signOut = async (req, res, next) => {};
