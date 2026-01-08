const banks = require("../data/banks.json");
const postData = require("../data/postdata.json");
function getBanks() {
   return new Promise((resolve, reject) => {
      resolve(banks);
   });
}

function addData() {
   return new Promise((resolve, reject) => {
      resolve(postData);
   });
}

module.exports = {
   getBanks,
   addData,
};
