const router = require("express").Router();
const New = require("../models/New.model.js");


const {isLoggedIn} = require("../middlewares/auth.js")


//get perfil
router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const userId = req.session.user._id
    const listOfNewsById = await New.find({owner:userId})
    res.render("profile/user.hbs", {listOfNewsById})

  } catch (err) {
    next(err)
  }
  
})

router.get("/", async (req, res, next) => {
  try {
    const listOfNews = await New.find().select("title")
    res.render("news/list.hbs", { listOfNews})
  } catch (err) {
    next(err)
  }
})




module.exports = router;