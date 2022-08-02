const router = require("express").Router();
const User = require("../models/User.model.js")
const Comment = require("../models/Comment.model.js")
const New = require("../models/New.model.js");



// get lista de comments
router.get("/", async (req, res, next) => {
  try {
    const listOfComments = await Comment.find()
    res.render("comment/list.hbs", {listOfComments})
  } catch (err) {
    next(err)
  }
})
// get comments details
/* router.get("/:commentId/details", async (req, res, next) => {
  try {
    const {commentId} = req.params
    commentId = await Comment.findById(commentId)
    res.render("comment/details.hbs", {commentDetails})
  } catch (err) {
    next(err)
  }
}) */

// get create comment
router.get("/create", async (req, res, next) => {
  console.log(req.session.user._id)
  res.render("comment/add-form.hbs")
  
})


//post create comment
router.post("/create", async (req, res, next) => {
try {
  const {userSignature, text, newLink, news} = req.body
  const userId = req.session.user._id
  
  const newComment = await Comment.create({
    userId,
    text,
    newLink,
    news
    
  })
  res.redirect("comment/add-form.hbs", {newComment}) // cambiar a views list
} catch (err) {
  next(err)
}
})

module.exports = router;