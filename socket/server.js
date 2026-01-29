import express from "express";
import getData from "./model";

const app = express();

app.get("/", async (req, res) => {
   res.send(await getData());
});
