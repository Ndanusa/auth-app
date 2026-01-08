const path = require("path");
const fs = require("fs").promises;
function addDataToFile(content) {
   fs.writeFile(
      path.join(process.cwd(), "data", "postdata.json"),
      JSON.stringify(content)
   );
}

module.exports = { addDataToFile };
