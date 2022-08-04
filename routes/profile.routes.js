const router = require("express").Router();
const New = require("../models/New.model.js");
const User = require("../models/User.model.js");
const Comment = require("../models/Comment.model.js");

const {isLoggedIn, isAdmin} = require("../middlewares/auth.js")


//get perfil
router.get("/", isLoggedIn, (req, res, next) => {
  res.render("profile/user.hbs")
})



router.get("/:userId/details", async (req, res, next) => {
  try {
    const {userId} = req.params
    const newsDetailId = await User.findById(userId).populate('owner')
    /* console.log(newsDetailId) */


    /* res.render("news/details.hbs", {newsDetailId, comment}) */
    /* const myOwner = await New.findById(newId).populate("owner"); */

    let isOwner = false;
    if (req.session.user !== undefined) {
      if (req.session.user._id == newsDetailId.owner._id) {
        /* console.log("le llamaban req", req.session.user._id) */
        isOwner = true;
      } else {
        isOwner = false;
      }
    res.render("news/details.hbs", {

      newsDetailId,
      isOwner,
      /* myOwner */
    });
  } else {
    res.render("news/details.hbs", {
      newsDetailId,
    });
  }
  } catch (err) {
    next(err)
  }
});




module.exports = router;