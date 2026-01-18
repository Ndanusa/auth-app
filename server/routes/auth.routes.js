import {Router} from "express";
import { signUp, signIn, signOut } from '../controllers/auth.controller.js'
import userRouter from "./users.routes.js";
const authRouter = Router();


//api/v1/auth/ (POST)
authRouter.post('/sign-up', signUp)
authRouter.post('/sign-in', signIn)
authRouter.post('/sign-out', signOut)
authRouter.get('/user/list', (req, res) => {
    res.send('this is for the axios testing')
})




export default authRouter;