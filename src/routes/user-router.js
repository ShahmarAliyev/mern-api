const userRouter = require("express").Router();

userRouter.get("/usertest", (req, res) => {
  res.send("User test is successful");
});

userRouter.post("/userposttest", (req, res) => {
  const username = req.body.username;
  console.log(username);
});

module.exports = userRouter;
