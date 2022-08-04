const router = require("express").Router();
const New = require("../models/New.model.js");
const User = require("../models/User.model.js");
const Comment = require("../models/Comment.model.js");

const {isLoggedIn, isAdmin} = require("../middlewares/auth.js")


//get perfil
router.get("/", isLoggedIn, (req, res, next) => {
  res.render("profile/user.hbs")
})


router.post('/')






module.exports = router;