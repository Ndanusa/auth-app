const express = require("express");
const app = express();
const cors = require("cors");
const { bankLists } = require("./controllers/users.controllers");
const port = 4000;
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/api/banks", (req, res) => {
   bankLists(req, res);
});

const { userRoutes } = require("./routes/users");

app.use("/users", userRoutes);

// app.post("/users/createUser", (req, res) => {
//    addItem(req, res);
// });

app.listen(port, () => {
   console.log(`Server is listening on port ${port}`);
});
