const router = require("express").Router();
const User = require("../models/User.model.js");
const bcrypt = require("bcryptjs");

// get "/auth/signup"
router.get("/signup", (req, res, next) => {
  res.render("auth/signup.hbs");
});
// post "/auth/signup"
router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;
  //fill in all the fields
  if (username === "" || email === "" || password === "") {
    res.render("auth/signup.hbs", {
      errorMessage: "Debes llenar todos los campos",
    });
    return;
  }
  // password strong
  let passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/;
  if (passwordRegex.test(password) === false) {
    res.render("auth/signup.hbs", {
      errorMessage:
        "La contraseña debe tener al menos una letra mayúscula, una minúscula, un número y un signo",
    });
    return;
  }

  // guard clauses
  try {
    // mail used?
    const foundUser = await User.findOne({ email });
    if (foundUser !== null) {
      res.render("auth/signup.hbs", {
        errorMessage: "Ese correo ya está siendo usado",
      });
      return;
    }
    // nameuser used?
    const foundUserByUsername = await User.findOne({ username });
    if (foundUserByUsername !== null) {
      res.render("auth/signup.hbs", {
        errorMessage: "Ese nombre de usuario ya existe",
      });
      return;
    }
    //encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // user create
    await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.redirect("/auth/login");
  } catch (err) {
    next(err);
  }
});

// get /auth/login
router.get("/login", (req, res, next) => {
  res.render("auth/login.hbs");
});

// post /auth/login
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  //  datos !== vacios
  if (username === "" || password === "") {
    res.render("auth/login.hbs", {
      errorMessage: "Debes llenar todos los datos",
    });
    return;
  }

  try {
    // login
    const foundUser = await User.findOne({ username });
    if (foundUser === null) {
      res.render("auth/login.hbs", {
        errorMessage: "Usuario no existe",
      });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, foundUser.password);
    if (isPasswordValid === false) {
      res.render("auth/login.hbs", {
        errorMessage: "Contraseña no válida, prueba de nuevo",
      });
      return;
    }
    req.session.user = {
      _id: foundUser._id,
      email: foundUser.email,
      username: foundUser.username,
      role: foundUser.role,
    };
    req.session.save(() => {
      res.redirect("/profile");
    });
  } catch (err) {
    next(err);
  }
});
// logout
router.get("/logout", (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
