const authRouter = require("express").Router();
const User = require("../models/User-model");
const CryptoJS = require("crypto-js");

authRouter.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    console.log(savedUser);
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong Username");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    );
    const savedUserPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    savedUserPassword !== req.body.password &&
      res.status(401).send({
        message: "Wrong Password",
      });

    const { password, ...others } = user._doc;

    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
    console.log(error.message);
    throw new Error();
  }
});

module.exports = authRouter;
