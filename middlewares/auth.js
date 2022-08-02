function isLoggedIn(req, res, next) {

    if (req.session.user === undefined) {
      res.redirect("/auth/login")
    } else {
      next() 
    }
  }
  function isAdmin(req, res, next) {
    if (req.session.user.role === "admin") {
      next()
    } else {
      res.redirect("/auth/login")
    }
  }

  // aqui el middleware que agregará variables para saber si el usuario está activo o no
function localsUpdate(req, res, next) {
  if (req.session.user === undefined) {
    // el usuario no está logeado
    res.locals.isUserActive = false;
    res.locals.isUserAdmin = false;
  } else if (req.session.user.role === "admin") {
    // el usuario está activo y es de tipo admin
    res.locals.isUserActive = true;
    res.locals.isUserAdmin = true;
  } else if (req.session.user.role === "user") {
    res.locals.isUserActive = true;
    res.locals.isUserAdmin = false;
  }
  next()
}


  module.exports = {
    isLoggedIn,
    isAdmin,
    localsUpdate
  }