const router = require("express").Router();
const User = require("../models/User.model.js")
const Comment = require("../models/Comment.model.js")


router.get("/news/list.hbs", (req, res, next) => {
    res.render("news/list.hbs")
  })