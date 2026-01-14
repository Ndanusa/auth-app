import {Router}  from "express";

const userRouter = Router();

userRouter.get('/api/v1/auth', (req, res) => {
    res.send('this is a get route for the users')
})
userRouter.get('/', (req, res) => {
    res.send('this is the home route for the subscription')
})

userRouter.post('/api/v1/auth', (req, res) => {
    res.send('this is a post route for the users')
})

userRouter.put('/api/v1/auth', (req, res) => {
    res.send('this is a get put for the users')
})

userRouter.delete('/api/v1/auth', (req, res) => {
    res.send('this is a get delete for the users')
})
export default userRouter;