
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
      const detailId = await New.findById(newId)
      res.render("news/details.hbs", { detailId})
    } catch (err) {
      next(err)
    }
  })

  // get create new  que nos lleve a la vista de add-form, 
  router.get("/create", (req, res, next) => {
    //try{
      //const { id } = req.params
      //const oneNew = await New.findById(id).populate('userSignature')
      //const allCategories = await New.find().select("category")
      res.render("news/add-form.hbs", {categoriesArr}) //{ oneNew})
    //}
    //catch (err) {
    //next(err)
  //}
  })


  //post create new y asocie la creación con el usuario
router.post("/create", async (req, res, next) => {
  try {
    const { title, text,newImage,category} = req.body //si el usuario es admin se agrega el is verified
    await New.create({
      category,
      title,
      text,
      newImage,
      isVerified: false,
      userSignature: req.session.user._id
    })
    res.redirect("/news") // TODO tiene que redirirgir a los details de la que hemos creado
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
    const { title, text,newImage,category} = req.body
    await New.findByIdAndUpdate(newId, {
      category,
      title,
      text,
      newImage,
      isVerified: false
    },{new:true}
    )
    
    res.redirect(`/news/${newId}/details`)
  } catch (err) {
  next(err)
}
})

//post delete
router.post("/:newId/delete", async (req, res, next) => {
  try {
    const { newId } = req.params
    await New.findByIdAndDelete(newId)
    res.redirect("/news")
  } catch (err) {
    next(err)
  }
})



module.exports = router;
