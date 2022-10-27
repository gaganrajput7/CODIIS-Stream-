const express = require("express");
const userRoutes = require("./routes/user.routes")
const connection = require("./db/db");
const app = express();
require('dotenv').config()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
res.sendFile(__dirname + "/index.html");
});
app.use("/",userRoutes)

app.listen(process.env.PORT || 3000, async () => {
await connection
  console.log("Started On Port")
});
