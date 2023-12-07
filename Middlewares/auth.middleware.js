//File has jwt token system for user login
const jwt = require("jsonwebtoken");
const userModel = require("../Models/user.model");

const authConfig = require("../Configs/auth.config");
const constants = require("../Utils/constants");

verifyToken = (req, res, next) => {
  let token = req.headers["x-auth-token"];
  //Token Check
  if (!token) {
    return res.status(404).send({
      message: "No token provided!",
    });
  }
  jwt.verify(token, authConfig.secret, (err, payload) => {
    if (err) {
      return res.status(401).send({
        message: "Please login first to access this endpoint!",
      });
    }
    req.userId = payload.userId;
    next();
  });
};
//Checking if user id Admin or not
isAdmin = async (req, res, next) => {
  const user = await userModel.findOne({ userId: req.userId });

  if (user && user.userRole == constants.userType.admin) {
    next();
  } else {
    return res.status(403).send({
      message: "You are not authorized to access this endpoint!",
    });
  }
};
//Check for User
isUser = async (req, res, next) => {
  const user = await userModel.findOne({ userId: req.userId });
  if (user && user.userRole == constants.userType.user) {
    next();
  } else {
    return res.status(403).send({
      message: "You are not authorized to access this endpoint!",
    });
  }
};
const authFunction = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isUser: isUser,
};

module.exports = authFunction;
