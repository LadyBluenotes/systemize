const { request } = require("http");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = await req.headers.authorization.split(" ")[1];
    const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");
    const user = await decodedToken;

    req.user = user;

    next();
    
  } catch (err) {
    console.log(err.message)
    res.status(401).json({
      err: new Error("Invalid request!"),
    });
  }
};