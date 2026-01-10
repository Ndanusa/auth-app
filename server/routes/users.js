const express = require("express");
const { addDataToFile, calculateAge, findUser } = require("../utils/utils");
const { getUsers } = require("../models/users.model");
const router = express.Router();

router.post("/new", async (req, res) => {
   const data = await getUsers();
   const body = req.body;
   const matchingUser = findUser(body, data, "username");

   if (matchingUser) {
      res.status(409).json({
         message: "user already exists",
         successful: false,
      });
      return;
   }

   const age = calculateAge(body?.age);

   if (age < 18) {
      res.send({
         message: "Age not required, must be 18 or older",
         successful: false,
      });
      return;
   }

   data.push(body);
   res.status(201).json({
      message: "User registration succesful",
      successful: true,
   });
   addDataToFile(data);
});

router.route("/id/:username").get(async (req, res) => {
   const params = req.params.username;
   const users = await getUsers();
   const matchingUser = findUser(null, users, "username", params.trim());
   if (matchingUser) {
      const { firstName, lastName, username, age } = matchingUser;
      const user = {
         firstName,
         lastName,
         age,
         username,
      };
      res.json(user);
      console.log(req.body);
      return;
   }
   res.send("User not found");
});

module.exports = { userRoutes: router };
