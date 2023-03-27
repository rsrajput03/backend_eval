const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const decoded = jwt.verify(token, "post");
    if (decoded) {
      req.body.userId = decoded.userId;
      next();
    } else {
      res.status(400).send({ msg: "Login First" });
    }
  } else {
    res.status(400).send({ msg: "Login First" });
  }
};

module.exports =  auth ;
