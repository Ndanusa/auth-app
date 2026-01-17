import authMiddleware from "../middleware/auth.middleware.js";
import {Router} from "express";

const router = Router();

router.get("/protected", authMiddleware, (req, res) => {
    res.json({
        message: 'Access granted',
        user: res.user
    })
})

export default router;