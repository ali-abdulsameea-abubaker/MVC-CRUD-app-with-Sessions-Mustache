// StAuth10222: I Ali Abubaker, 000857347 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.


const express = require('express');
var router = express.Router();
const UsersModel = require('../models/users.js');
// Show the page for signup.
router.get("/", async function(req, res)
{
  // Delete any prior success or error messages.
  req.TPL.signup_error = req.session.signup_error || "";
  req.TPL.signup_success = req.session.signup_success || "";
  req.session.signup_error = "";
  req.session.signup_success = "";
  res.render("signup", req.TPL);
});
// signingup form
router.post("/create", async function(req, res)
{
  const { username, password } = req.body;
  // Validating user input
  if (!username || !password || username.length < 1 || password.length < 1) {
    req.session.signup_error = "Username/password cannot be blank!";
    res.redirect("/signup");
    return;
  }
  // Creating new user
  await UsersModel.createUser(username, password, "member");
  // Create a success message using the precise text specified in the requirement.
  req.session.signup_success = "User account created!";
  res.redirect("/signup");
});

module.exports = router;