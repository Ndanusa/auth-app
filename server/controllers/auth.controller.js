import mongoose from "mongoose";
import User from '../models/user.models.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {JWT_EXPIRES_IN, JWT_SECRET} from "../config/env.js";
import connectDB from "../DATABASE/mongodb.js";
export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession()
    session.startTransaction()
    try{
        const {name, email, password} = req.body

        const existingUser = await User.findOne({ email })


        if (existingUser) {
            const error = new Error('User already exists')
            error.status = 401
            throw error
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = await User.create([{name, email, password: hashedPassword}, {session}])
        const token = jwt.sign({userId: newUser[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN})
        await session.commitTransaction()
        res.status(201).json({
            message: 'user created successfully.',
            status: true,
            data: {
                token,
                user: newUser[0]
            }
        })
    }catch (error){
        await session.abortTransaction()
        await session.endSession()
        next(error)
    }
}


export const signIn = async (req, res, next) => {
    res.send('Hello this is a sign in logic')

}
export const signOut = async (req, res, next) => {
    res.send('Hello this is a sign out logic')
}
