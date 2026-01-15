import mongoose from "mongoose";
import User from '../models/user.models.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {JWT_EXPIRES_IN, JWT_SECRET} from "../config/env.js";
import connectDB from "../DATABASE/mongodb.js";
export const signUp = async (req, res, next) => {
    await connectDB(res)
    // const session = await mongoose.startSession()
    // session.startTransaction()
    // try{
    //     const {firstName, lastName, username, email, password} = req.body
    //
    //     const existingEmail = await User.findOne({ email })
    //     const existingUsername = await User.findOne({ username })
    //
    //
    //     if (existingEmail) {
    //         const error = new Error('User already exists')
    //         error.status = 409
    //         throw error
    //     }
    //     if (existingUsername) {
    //         const error = new Error("Username already exists")
    //         error.status = 409
    //         throw error
    //     }
    //
    //     const salt = await bcrypt.genSalt(10)
    //     const hashedPassword = await bcrypt.hash(password, salt)
    //     const newUser = await User.create([{firstName, lastName, email, password: hashedPassword, username}, {session}])
    //     const token = jwt.sign({userId: newUser[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})
    //     await session.commitTransaction()
    //     res.status(201).json({
    //         message: 'user created successfully.',
    //         status: true,
    //         data: {
    //             token,
    //             user: newUser[0]
    //         }
    //     })
    // }catch (error){
    //     await session.abortTransaction()
    //     await session.endSession()
    //     next(error)
    // }
}


export const signIn = async (req, res, next) => {
    res.send('Hello this is a sign in logic')

}
export const signOut = async (req, res, next) => {
    res.send('Hello this is a sign out logic')
}
