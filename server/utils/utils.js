const path = require("path");
const fs = require("fs").promises;
function addDataToFile(content) {
   fs.writeFile(
      path.join(process.cwd(), "data", "postdata.json"),
      JSON.stringify(content)
   );
}

function calculateAge(birthDateString) {
   const today = new Date();
   const birthDate = new Date(birthDateString);
   let age = today.getFullYear() - birthDate.getFullYear();
   const monthDifference = today.getMonth() - birthDate.getMonth();
   if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
   ) {
      age--;
   }

   return age;
}

function findUser(body, content, key1, key2) {
   if (!body) {
      return content.find((item) => {
         return item[key1] === key2;
      });
   }

   return content.find((item) => {
      return item[key1] === body?.[key1];
   });
}

module.exports = { addDataToFile, calculateAge, findUser };
