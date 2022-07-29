const router = require("express").Router();

const {isLoggedIn, isAdmin} = require("../middlewares/auth.js")


//get perfil
router.get("/", isLoggedIn, (req, res, next) => {
  res.render("profile/private.hbs")
})

//get admin
router.get("/admin", isLoggedIn, isAdmin, (req, res, next) => {
  res.render("profile/admin.hbs")
})


module.exports = router;