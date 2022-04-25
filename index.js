const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRouter = require("./src/routes/user-router");
const cartRouter = require("./src/routes/cart-router");
const authRouter = require("./src/routes/auth-router");
const orderRouter = require("./src/routes/order-router");
const productsRouter = require("./src/routes/product-router");
const stripeRouter = require("./src/routes/stripe-router");

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
app.use(cors());

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRouter);
app.use("/api/stripe", stripeRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running");
});
