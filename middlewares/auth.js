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


function localsUpdate(req, res, next) {
  if (req.session.user === undefined) {
    res.locals.isUserActive = false;
    res.locals.isUserAdmin = false;

  } else if (req.session.user.role === "admin") {
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