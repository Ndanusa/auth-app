const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const { bankLists } = require("./controllers/users.controllers");
const port = 4000;
app.use(cors({ origin: "*" }));
app.use(express.json());
app.get("/api/banks", (req, res) => {
   bankLists(req, res);
   console.log(req.originalUrl);
});

const { userRoutes } = require("./routes/users");

app.use("/users", userRoutes);

app.listen(port, () => {
   console.log(`Server is listening on port ${port}`);
});
