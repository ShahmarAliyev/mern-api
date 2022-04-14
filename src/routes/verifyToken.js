const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
      if (error) res.status(403).json("Token is not valid");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated");
  }
};

const verifyTokenAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    console.log(req.user.id, req.params.id, !req.user.isAdmin);
    if (req.user.id === req.params.id || !req.user.isAdmin) {
      console.log("works");
      next();
    } else {
      res.status(403).json("You are not  allowed the make changes");
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAuth };
