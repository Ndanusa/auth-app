import protectedMiddleware from "../middleware/protected.middleware.js";
import { Router } from "express";

const router = Router();

router.get("/protected", protectedMiddleware, (req, res) => {
  res.json({
    message: "Access granted",
    user: res.user,
  });
});

export default router;
