import jwt from 'jsonwebtoken'
import {JWT_SECRET} from "../config/env.js";

function protectedMiddleware(req, res, next) {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' })
    }
    const token = authHeader.split(' ')[1]

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' })
        }
        req.user = decoded
        next()
    })
}

export default protectedMiddleware