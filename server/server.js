import { PORT, DB_URI, NODE_ENV } from "./config/env.js";
import connectDB from "./DATABASE/mongodb.js";
import express from "express";
const app = express();

app.get("/", async (req, res) => {
   await connectDB();
});

app.listen(PORT, () => {
   console.log("app is listening on http://localhost:" + PORT);
});
