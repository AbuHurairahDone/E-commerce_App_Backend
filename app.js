require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const DBconnect = require("./connection/DBconnect");
const registerationRouter = require("./routes/registerRouter.js");
const profileRouter = require("./routes/ProfileRouter");
const productRouter = require("./routes/productRouter");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/v1", registerationRouter);
app.use("/api/v1", profileRouter);
app.use("/api/v1", productRouter);

app.listen(process.env.PORT, () => {
  console.log("Server running on port 1000");
});
