const { getBanks, getUsers } = require("../models/users.model");
const { addDataToFile } = require("../utils/utils");
async function bankLists(req, res) {
   res.json(await getBanks());
}

async function createUser(req, res) {
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
}

module.exports = { bankLists, createUser };
