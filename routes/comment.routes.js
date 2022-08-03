const router = require("express").Router();
const User = require("../models/User.model.js")
const Comment = require("../models/Comment.model.js")
const New = require("../models/New.model.js");


// ? ----------------------Original---------------------------------------
// get create comment
/* router.get("/:newId/details/create/comment", async (req, res, next) => {
  res.render("comment/add-form.hbs")
}) */


//post create comment
/* router.post("/:newId/details/comment/create", async (req, res, next) => {
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
}) */
// ? ----------------------Original---------------------------------------


  // ! no funciona
//post create comment en news/details // TODO version 3.-Comentarios en news/details
router.post("/:newId/comment/create", async (req, res, next) => {
  try {
    const {text, newLink} = req.body
    const {newId} = req.params
    console.log("lo ves", newId)
    await Comment.create({
      userSignature: req.session.user._id,
      text,
      newLink,
      news: newId
    })
    res.redirect(`/news/${newId}/details`)
  } catch (err) {
    next(err)
  }
  })
  // ! no funciona


  //TODO--------Crear un comentario RANDOM---------------------


// get comment create en la DB pero SIN RELACIÓN // TODO v2
/* router.get("/create", (req, res, next) => {
  res.render("comment/add-form.hbs")
})

// post comment create en la DB pero SIN RELACIÓN // TODO v2
  router.post("/create", async (req, res, next) => {
  try {
    const {text, newLink} = req.body
    await Comment.create({
      text,
      newLink,
    })
    res.redirect("/news")
  } catch (err) {
    next(err)
  }
  })
  //* FUNCIONA */

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

