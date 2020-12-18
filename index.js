require("dotenv").config();
require("./db");

const authRoute = require("./routes/auth");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
app.use(cors());

app.use(express.json());
app.use("/api/auth", authRoute);

app.listen(port, () => console.log(`App listening on port ${port}!`));
