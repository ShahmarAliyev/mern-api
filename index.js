const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./src/routes/user-router");
const authRouter = require("./src/routes/auth-router");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Successfully connected to Mongo DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/api/users", userRouter);
app.use("/", authRouter);

app.listen(process.env.PORT || 500, () => {
  console.log("Backend server is running");
});
