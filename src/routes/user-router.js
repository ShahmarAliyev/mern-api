const userRouter = require("express").Router();
const User = require("../models/User-model");
const { verifyToken, verifyTokenAndAuth } = require("./verifyToken");

userRouter.put("/:id", verifyTokenAndAuth, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSWORD_SECRET
    ).toString();
  }
  try {
    console.log(req.params.id);
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        username: req.body.username,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
    console.log(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = userRouter;
