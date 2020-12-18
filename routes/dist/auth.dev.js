"use strict";

require("dotenv").config();

var Router = require("express").Router();

var _require = require("../validation"),
    loginValidate = _require.loginValidate,
    registerValidate = _require.registerValidate;

var bcrypt = require("bcryptjs");

var User = require("../model/User");

var jwt = require("jsonwebtoken");

Router.post("/login", function _callee(req, res) {
  var validate, _validate$value, email, password, user, checkPassword, token;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          validate = loginValidate.validate(req.body);

          if (!validate.hasOwnProperty("error")) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            status: "error",
            message: "Invalid request data",
            error: validate.error.details[0].message,
            data: req.body
          }));

        case 3:
          _validate$value = validate.value, email = _validate$value.email, password = _validate$value.password;
          _context.next = 6;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }).exec());

        case 6:
          user = _context.sent;

          if (user) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(404).send({
            message: "Not found"
          }));

        case 9:
          _context.next = 11;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 11:
          checkPassword = _context.sent;

          if (checkPassword) {
            _context.next = 14;
            break;
          }

          return _context.abrupt("return", res.status(401).send({
            message: "Not authenticated"
          }));

        case 14:
          token = jwt.sign({
            _id: user._id
          }, process.env.AUTH_TOKEN);
          res.header("auth-token", token);
          return _context.abrupt("return", res.send({
            message: "Authenticated"
          }));

        case 17:
        case "end":
          return _context.stop();
      }
    }
  });
});
Router.post("/register", function _callee2(req, res) {
  var validate, _validate$value2, name, email, password, user, salt, hash, newUser;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          validate = registerValidate.validate(req.body); //validation

          if (!validate.hasOwnProperty("error")) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            status: "error",
            message: "Invalid request data",
            error: validate.error.details[0].message,
            data: req.body
          }));

        case 3:
          _validate$value2 = validate.value, name = _validate$value2.name, email = _validate$value2.email, password = _validate$value2.password; //Find user exist in db

          _context2.next = 6;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }).exec());

        case 6:
          user = _context2.sent;

          if (!user) {
            _context2.next = 9;
            break;
          }

          return _context2.abrupt("return", res.status(400).send({
            message: "User Already exist"
          }));

        case 9:
          _context2.next = 11;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 11:
          salt = _context2.sent;
          _context2.next = 14;
          return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

        case 14:
          hash = _context2.sent;
          //Storing into db
          newUser = new User({
            name: name,
            email: email,
            password: hash
          });
          newUser.save();
          return _context2.abrupt("return", res.status(201).send({
            message: "User created"
          }));

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  });
});
module.exports = Router;