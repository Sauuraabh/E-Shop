//File for user signup and authentication

const User = require("../Models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authConfig = require("../Configs/auth.config");

//Function will allow user to sign up
exports.signup = async (req, res) => {
  const hashedPass = bcrypt.hashSync(req.body.password, 10);

  // Check if email already exists in the database
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(403).json({
      message: "Try any other email, this email is already registered!",
    });
  }

  // Check email format using a regular expression
  const emailFormat = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  if (!emailFormat.test(req.body.email)) {
    return res.status(403).json({
      message: "Invalid email format!",
    });
  }

  // Check if phone number is valid using a regular expression
  const phoneFormat = /^\d{10}$/;
  if (!phoneFormat.test(req.body.phoneNumber)) {
    return res.status(403).json({
      message: "Invalid contact number!",
    });
  }
  //Creating User Object
  const userObj = {
    userId: req.body.userId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userRole: req.body.userRole,
    email: req.body.email,
    password: hashedPass,
    phoneNumber: req.body.phoneNumber,
  };

  // Creating non-existing Users
  try {
    const userCreated = await User.create(userObj);
    const postResponse = {
      userId: userCreated.userId,
      firstName: userCreated.firstName,
      lastName: userCreated.lastName,
      userRole: userCreated.userRole,
      email: userCreated.email,
      phoneNumber: userCreated.phoneNumber,
    };
    res.status(200).send(postResponse);
  } catch (err) {
    console.log(`Error while inserting user ${err}`);
    res.status(500).send({
      message: "Some internal error while registration",
    });
  }
};
//Function will allow user to Sign in

exports.signin = async (req, res) => {
  //fetch user based on the userID provided in req.body
  const user = await User.findOne({ email: req.body.email });
  if (user == null) {
    return res.status(400).send({
      message: "This email has not been registered!",
    });
  }
  const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send({
      message: "Invalid Credentials!",
    });
  }
  //Fetching user info from jwt token
  const token = jwt.sign({ userId: user.userId }, authConfig.secret, {
    expiresIn: 20000,
  });
  var responseUser = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    accessToken: token,
  };
  res.status(200).send(responseUser);
};
