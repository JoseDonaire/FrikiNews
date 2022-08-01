
const router = require("express").Router();
const New = require("../models/New.model.js");
const User = require("../models/User.model.js");
const Comment = require("../models/Comment.model.js");
const categoriesArr = require('../utils/categories.js')//hay q llamarla aquí?


// get lista de noticias
router.get("/", async (req, res, next) => {
    try {
      const listOfNews = await New.find().select("title")
      res.render("news/list.hbs", { listOfNews})
    } catch (err) {
      next(err)
    }
  })
// get details
  router.get("/:newId/details", async (req, res, next) => {
    try {
      const {newId} = req.params
      newId = await New.findById(newId)
      res.render("new/details.hbs", { newDetails})
    } catch (err) {
      next(err)
    }
  })

  // get create new
  router.get("/create", async (req, res, next) => {
    try{
      const { id } = req.params
      const oneNew = await New.findById(id).populate('userSignature')
      //const allCategories = await New.find().select("category")
      res.render("new/details.hbs", { oneNew})
    }
    catch (err) {
    next(err)
  }
  })


  //post create new
router.post("/create", async (req, res, next) => {
  try {
    const { category, title, text,userSignature,newImage,isVerified } = req.body
    const userNew = await New.create({
      category,
      title,
      text,
      userSignature,
      newImage,
      isVerified
    })
    res.redirect("news/add-form.hbs", {userNew})
  } catch (err) {
    next(err)
  }
})

//get edit
router.get("/:newId/edit", async (req, res, next) => {
  try {
    const { newId } = req.params
    const editNew = await New.findById(newId)
    res.render("news/edit-form.hbs", {editNew})
  } catch (err) {
  next(err)
}
})

//post edit
router.post("/:newId/edit", async (req, res, next) => {
  try {
    const {newId} = req.params
    const { category, title, text,isVerified } = req.body
    const editNew = await New.findByIdAndUpdate(newId, {
      category,
      title,
      text,
      isVerified
    })
    res.redirect("news/edit-form.hbs", {editNew})
  } catch (err) {
  next(err)
}
})

//post delete
router.post("/:newId/details", async (req, res, next) => {
  try {
    const { newId } = req.params
    const deletedNew = await New.findByIdAndDelete(newId)
    res.redirect("new/details.hbs", {deletedNew})
  } catch (err) {
    next(err)
  }
})

module.exports = router;
