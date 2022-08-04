const router = require("express").Router();
const Comment = require("../models/Comment.model.js");

//post create comment in news/details
router.post("/:newId/create", async (req, res, next) => {
  try {
    const { text, newLink } = req.body;
    const { newId } = req.params;
    await Comment.create({
      owner: req.session.user._id,
      text,
      newLink,
      news: newId,
    });
    res.redirect(`/news/${newId}/details`);
  } catch (err) {
    next(err);
  }
});

//get edit comment
router.get("/:commentId/edit", async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const editComment = await Comment.findById(commentId);
    res.render("/comment/edit-form.hbs", { editComment });
  } catch (err) {
    next(err);
  }
});

//post edit comment
router.post("/:commentId/edit", async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { text, newLink } = req.body;
    await Comment.findByIdAndUpdate(
      commentId,
      {
        text,
        newLink,
      },
      {
        new: true,
      }
    );
    res.redirect(`/news/${newId}/details`);
  } catch (err) {
    next(err);
  }
});

//delete comment
router.post("/:commentId/delete", async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    res.redirect("/news"); // esto está mal
  } catch (err) {
    next(err);
  }
});

module.exports = router;
