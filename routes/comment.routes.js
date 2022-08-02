const router = require("express").Router();
const User = require("../models/User.model.js")
const Comment = require("../models/Comment.model.js")
const New = require("../models/New.model.js");



//get edit comment
router.get("/:commentId/edit", async (req, res, next) => {
  try {
    const { commentId } = req.params
    const editComment = await Comment.findById(commentId)
    res.render("/comment/edit-form.hbs", {editComment})
  } catch (err) {
  next(err)
}
})

//post edit comment
router.post("/:commentId/edit", async (req, res, next) => {
  try {
    const {commentId} = req.params
    const { title, text,newImage,category} = req.body
    await Comment.findByIdAndUpdate(commentId, {
      text,
    newLink,
    },{
      new:true
   })
    res.redirect(`/news/${newId}/details`)
  } catch (err) {
  next(err)
}
})


//delete comment
router.post("/:commentId/delete", async (req, res, next) => {
  try {
    const { commentId } = req.params
    await Comment.findByIdAndDelete(commentId)
    res.redirect('/news/${newId}/details')// esto está mal
  } catch (err) {
    next(err)
  }
})

router.get("/:newId/details/create/comment", async (req, res, next) => {
  res.render("comment/add-form.hbs")
})


//post create comment
router.post("/:newId/details/create/comment", async (req, res, next) => {
try {
  const {text, newLink} = req.body
  const {newId} = req.params
  await Comment.create({
    userSignature:req.session.user._id,
    text,
    newLink,
    news
  })
  res.redirect(`/news/${newId}/details`, {newComment}) // cambiar a views list
} catch (err) {
  next(err)
}
})

module.exports = router;

