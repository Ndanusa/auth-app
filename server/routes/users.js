const express = require("express");
const { addDataToFile } = require("../utils/utils");
const { getUsers } = require("../models/users.model");
const router = express.Router();

router.post("/new", async (req, res) => {
   const data = await getUsers();
   let body = req.body;
   const matchingItem = data.find((item) => {
      return item.username === body.username;
   });
   if (matchingItem) {
      res.status(409).json({
         message: "user already exists",
         successful: false,
      });
      return;
   }
   data.push(body);
   res.status(201).json({
      message: "User registration succesful",
      successful: true,
   });
   console.log(data);
   addDataToFile(data);
});

router.get("/id/:username", async (req, res) => {
   const params = req.params.username;
   const users = await getUsers();
   const matchingUser = users.find((item) => item.username === params.trim());
   if (matchingUser) {
      const { firstName, lastName, username, age } = matchingUser;
      const user = {
         firstName,
         lastName,
         age,
         username,
      };
      res.json(user);
      return;
   }
   res.send("User not found");
});

module.exports = { userRoutes: router };
