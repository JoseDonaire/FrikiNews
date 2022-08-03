const router = require("express").Router();
const New = require("../models/New.model.js");
const User = require("../models/User.model.js");
const Comment = require("../models/Comment.model.js");

const {isLoggedIn, isAdmin} = require("../middlewares/auth.js")


//get perfil
router.get("/", isLoggedIn, (req, res, next) => {
  res.render("profile/user.hbs")
})


router.get("/:userId", async (req, res, next) => {
  try {
    const {newId} = req.params
    const detailId = await New.findById(newId).populate('owner')
    console.log(detailId)
    const comment = await Comment.find({news: newId}).populate('owner');
    console.log("this is the", comment)

    /* res.render("news/details.hbs", {detailId, comment}) */
    /* const myOwner = await New.findById(newId).populate("owner"); */

    let isOwner = false;
    if (req.session.user !== undefined) {
      if (req.session.user._id == detailId.owner._id) {
        console.log("le llamaban req", req.session.user._id)
        isOwner = true;
      } else {
        isOwner = false;
      }
    res.render("news/details.hbs", {

      detailId,
      isOwner,
      comment
      /* myOwner */
    });
  } else {
    res.render("news/details.hbs", {
      detailId,
      comment,
    });
  }
  } catch (err) {
    next(err)
  }
});




//get admin
router.get("/admin", isLoggedIn, isAdmin, (req, res, next) => {
  res.render("profile/admin.hbs")
})


module.exports = router;