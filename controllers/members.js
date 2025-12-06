// StAuth10222: I Ali Abubaker, 000857347 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.


const express = require('express');
var router = express.Router();
const ArticlesModel = require('../models/articles.js');

// Display the members page
router.get("/", function(req, res)
{
  res.render("members", req.TPL);
});

// If the form has been submitted, write an article.
router.post("/create", async function(req, res)
{
  // Use the logged-in username as the author and create the article using the model method.
  await ArticlesModel.createArticle(req.body, req.session.username);

  req.TPL.message = "Article successfully created!";
  res.render("members", req.TPL);

});

module.exports = router;