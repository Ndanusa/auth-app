import express from "express";
import path from "path";
import { v4 as uuid } from "uuid";
import fs from "fs";
import cors from "cors";
const app = express();
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
   res.json(uuid());
});


app.listen(4000, () => {
   console.log("app is listening on port 4000");
});

