require("dotenv").config();
const Router = require("express").Router();
const { loginValidate, registerValidate } = require("../validation");
const bcrypt = require("bcryptjs");
const User = require("../model/User");
const jwt = require("jsonwebtoken");

Router.post("/login", async (req, res) => {
  const validate = loginValidate.validate(req.body);
  if (validate.hasOwnProperty("error"))
    return res.status(400).json({
      status: "error",
      message: "Invalid request data",
      error: validate.error.details[0].message,
      data: req.body,
    });
  const { email, password } = validate.value;
  let user = await User.findOne({ email }).exec();
  if (!user) return res.status(404).send({ message: "Not found" });

  // @ts-ignore
  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword)
    return res.status(401).send({ message: "Not authenticated" });

  const token = jwt.sign({ _id: user._id }, process.env.AUTH_TOKEN);
  res.header("auth-token", token);

  return res.send({ message: "Authenticated" });
});
Router.post("/register", async (req, res) => {
  const validate = registerValidate.validate(req.body);
  //validation
  if (validate.hasOwnProperty("error"))
    return res.status(400).json({
      status: "error",
      message: "Invalid request data",
      error: validate.error.details[0].message,
      data: req.body,
    });
  const { name, email, password } = validate.value;

  //Find user exist in db
  const user = await User.findOne({ email }).exec();
  if (user) return res.status(400).send({ message: "User Already exist" });
  //hashing password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  //Storing into db
  const newUser = new User({ name, email, password: hash });
  newUser.save();

  return res.status(201).send({ message: "User created" });
});
module.exports = Router;
