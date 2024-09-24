require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const DBconnect = require("./connection/DBconnect");
const registerationRouter = require("./routes/registerRouter.js");
const profileRouter = require("./routes/ProfileRouter");
const productRouter = require("./routes/productRouter");
const packagesRouter = require("./routes/packagesRouter");
const paymentRouter = require("./routes/paymentRouter");
const couponRouter = require("./routes/couponRouter");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/v1", registerationRouter);
app.use("/api/v1", profileRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", packagesRouter);
app.use("/api/v1", paymentRouter);
app.use("/api/v1", couponRouter);
app.listen(process.env.PORT, () => {
  console.log("Server running on port 1000");
});
