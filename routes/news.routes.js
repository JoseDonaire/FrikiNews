const router = require("express").Router();
const New = require("../models/New.model.js");
const User = require("../models/User.model.js");
const Comment = require("../models/Comment.model.js");

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
      res.render("new/details.hbs", { listOfNews})
    } catch (err) {
      next(err)
    }
  })

  module.exports = router;

