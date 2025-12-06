// StAuth10222: I Ali Abubaker, 000857347 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.


const express = require('express');
var router = express.Router()
const UsersModel = require('../models/users.js')

// Displays the login page
router.get("/", async function(req, res)
{
  // if we had an error during form submit, display it, clear it from session
  req.TPL.login_error = req.session.login_error;
  req.session.login_error = "";

  // display the login screen
  res.render("login", req.TPL);
});

// Trys to log a user in
//- The login page's form submission action.
router.post("/attemptlogin", async function(req, res)
{
  const { username, password } = req.body;

 // Verify if the user is present in the database.
  const user = await UsersModel.getUser(username, password);
  
  if (user) {
    // Configure session variables
    req.session.username = user.username;
    req.session.user_level = user.level;

    // redirect based on user level
    if (user.level === 'editor') {
      res.redirect("/editors");
    } else {
      res.redirect("/members");
    }
  }
  else
  {
    // Reload the login page with an error if there is one.
    req.session.login_error = "Invalid username and/or password!";
    res.redirect("/login");
  }

});

// Logout a user 
// Sends the user back to the home page and destroys the session key username that is used to check if the user is logged in.
router.get("/logout", async function(req, res)
{
  delete(req.session.username);
  delete(req.session.user_level);
  res.redirect("/home");
});

module.exports = router;