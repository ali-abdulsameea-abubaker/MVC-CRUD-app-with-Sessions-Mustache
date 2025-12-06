// StAuth10222: I Ali Abubaker, 000857347 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.


const express = require('express');
var router = express.Router();
const UsersModel = require('../models/users.js');
const ArticlesModel = require('../models/articles.js');

// Display the editors page
router.get("/", async function(req, res) {
 // Retrieve every user and article for the screen.
  const users = await UsersModel.getAllUsers();
  const articles = await ArticlesModel.getAllArticles();
  
  req.TPL.users = users;
  req.TPL.articles = articles;
  
  res.render("editors", req.TPL);
});

// Deleting a user
router.get("/deleteuser/:username", async function(req, res) {
  const username = decodeURIComponent(req.params.username);
  
 // Remove the user and their posts
  await UsersModel.deleteUser(username);
  await ArticlesModel.deleteArticlesByAuthor(username);
  
  res.redirect("/editors");
});

// Deleting an article
router.get("/deletearticle/:title", async function(req, res) {
  const title = decodeURIComponent(req.params.title);
  
  await ArticlesModel.deleteArticle(title);
  
  res.redirect("/editors");
});

module.exports = router;