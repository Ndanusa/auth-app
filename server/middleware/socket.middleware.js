import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

io.use((socket, next) => {
   const token = socket.handshake.auth.token;
   if (!token) {
      res.json({
         error: true,
         message: "Unauthorzed",
      });
      try {
         const decoded = jwt.verify.token(token, JWT_SECRET);
         socket.userId = decoded.id;
         next();
      } catch (error) {
         next(new Error("Invalid Token"));
      }
   }
});
