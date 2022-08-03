const router = require("express").Router();
const User = require("../models/User.model.js")
const Comment = require("../models/Comment.model.js")
const New = require("../models/New.model.js");



//post create comment en news/details // TODO version 3.-Comentarios en news/details
router.post("/:newId/create", async (req, res, next) => {
  try {
    const {text, newLink} = req.body
    console.log(req.body)
    const {newId} = req.params
    console.log("lo ves", newId)
    await Comment.create({
      owner: req.session.user._id,
      text,
      newLink,
      news: newId
    })
    res.redirect(`/news/${newId}/details`)
  } catch (err) {
    next(err)
  }
  })

  //TODO--------Crear un comentario RANDOM---------------------


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
    const {text,newLink} = req.body
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
    const deletedComment = await Comment.findByIdAndDelete(commentId)
    console.log('debug', deletedComment)
    res.redirect('/news/${newId}/details')// esto está mal
  } catch (err) {
    next(err)
  }
})



module.exports = router;

