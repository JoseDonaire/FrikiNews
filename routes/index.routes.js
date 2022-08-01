const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// ruta auth
const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)


//ruta profile
const profileRoutes = require("./profile.routes")
router.use("/profile", profileRoutes)

//ruta news
const newsRoutes = require("./news.routes.js")
router.use("/news", newsRoutes)

const commentRoutes = require("./comment.routes.js")
router.use("/comment", commentRoutes)


module.exports = router;
