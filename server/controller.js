const bodyparser = require("body-parser");
var { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcrypt");
const User = require("./models/User");
module.exports = function(app) {
  const regValidation = [
    check("email")
      .not()
      .isEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email should be an email address"),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password should be at least 6 characters"),
    check(
      "password_con",
      "Password confirmation  is required or should be the same as password"
    ).custom(function(value, { req }) {
      if (value !== req.body.password) {
        throw new Error("Password don't match");
      }
      return value;
    }),
    check("email").custom(value => {
      return User.findOne({ email: value }).then(function(user) {
        if (user) {
          throw new Error("This email is already in use");
        }
      });
    })
  ];

  function register(req, res) {
    var errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send({ errors: errors.mapped() });
    }
    var user = new User(req.body);
    user.password = user.hashPassword(user.password);
    user
      .save()
      .then(user => {
        return res.json(user);
      })
      .catch(err => res.send(err));
  }

  app.post("/register", regValidation, register);
  app.get("/", (req, res) => res.json("sdasdsa"));
  //---------------------------------------------
  const logValidation = [
    check("email")
      .not()
      .isEmpty()
      .withMessage("Email is required"),
    check("password")
      .not()
      .isEmpty()
      .withMessage("Password is required")
  ];
  function loginUser(req, res) {
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.send({ errors: errors.mapped() });
    }
    User.findOne({
      email: req.body.email
    })
      .then(function(user) {
        if (!user) {
          return res.send({ error: true, message: "User does not exist!" });
        }
        if (!user.comparePassword(req.body.password, user.password)) {
          return res.send({ error: true, message: "Wrong password!" });
        }
        req.session.user = user;
        req.session.isLoggedIn = true;
        return res.send({ message: "You are signed in" });
        res.send(user);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  app.post("/", logValidation, loginUser);
  //----------------------------------------------------
  function isLoggedIn(req, res, next) {
    if (req.session.isLoggedIn) {
      res.send(true);
    } else {
      res.send(false);
    }
  }
  app.get("/api/isloggedin", isLoggedIn);

};
