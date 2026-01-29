import express from "express";
import getData from "./model.js";

const app = express();

app.get("/", async (req, res) => {
   res.json(await getData());
});

app.listen(3000, () => console.log("app is listening"));
