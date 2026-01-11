import express from "express";
import fs from "fs";

const app = express();

app.get("/", (req, res) => {
   console.log(req.url);
});

app.listen(4000, () => {
   console.log("app is listening on port 4000");
});
