import { PORT, DB_URI, NODE_ENV } from "./config/env.js";
import connectDB from "./DATABASE/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";
import express from "express";
const app = express();
app.use(errorMiddleware )
app.use(express.json())
const users = [
   {
      name: "John",
      age: 20
   },
   {
      name: 'sadeeq',
      age:  22
   }
]
app.get("/middle", async (req, res) => {

});

app.listen(PORT, () => {
   console.log("app is listening on http://localhost:" + PORT);
});
