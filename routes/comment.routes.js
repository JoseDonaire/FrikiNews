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

module.exports = router;

