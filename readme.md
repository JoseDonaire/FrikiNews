# Tu Receta 

## Descripción

Página web donde puedes compartir y ver noticias relacionadas con el mundo friki 

## Estructura 

- página de inicio: En la página de inicio el cliente tendrá acceso a registrarse, logearse o acceder a las noticias. 

- registarse: El cliente debe registarse para poder iniciar sesión.

- iniciar sesión: El cliente debe iniciar sesisión para entrar en su perfil y crear, editar y borrar sus propias noticias. 

- cerrar sesión: El cliente debe cerrar sesión por seguridad. 

# RUTAS: 

# Registro de usuario 

- GET /auth/signup
   - render("auth/signup.hbs")

- POST /auth/signup
   - render("auth/signup.hbs"
   - redirect("/auth/login")

# Iniciar sesion

- GET /auth/login
   - render("auth/login")

- POST /auth/login
   - render("auth/login"
   - req.session.user = {
      _id: foundUser._id,
      email: foundUser.email,
      username: foundUser.username,
      role: foundUser.role,
     }
   - res.redirect("/profile")

# Cerrar sesion

- GET /auth/logout
  - res.redirect("/")

# Perfil 

- GET /profile
  - owner: userId
  - render("profile/profile/user.hbs"

# Lista de Noticias

- GET /news
  - render("news/list.hbs"

# Detalles de Noticias 

- GET news/:newId/details
  - params 
   - newId
  - populate("owner")
  - populate("owner")
  - render("news/news-details.hbs"

# Crear Noticias

- GET /news/create 
 -  render("news/add-form.hbs")

- POST /recipe/create 
     - category
     - title
     - text
     - newImage
     - isVerified
     - owner





# Editar una receta 

- GET /news/:newId/edit
  - render("news/edit-form.hbs"

- POST  /news/:newId/edit
      - category
      -  title
      -  text
      -  newImage
      -  isVerified

# Eliminar recetas 

- POST /news/:newId/delete
  - redirect("/news")

# Comentarios 

- POST comment/:newId/create
    - owner
    - text
    - newLink
    - news
  - redirect(`/news/${newId}/details`)

- GET  comment/:commentId/edit
  - render("/comment/edit-form.hbs"

- POST /:commentId/edit
  - redirect(`/news/${newId}/details`)

## Modelos

# UserModel

- username: 
  - type: String
  - unique: true
  - required: true

- password: 
  - type: String
  - required: true

 
- email: 
  - type: String
  - unique: true
  - required: true

- role:
  - type: String
  - enum: ["user", "admin"]
  - default: "user"


# NewsModel 
-  category: 
  - type: String
  - enum: categoriesArr
  - required: true

- title: 
  - type: String
  - unique: true
  - required: true

- text: 
  - type: String
  - required: true
    
- owner:
    - type: Schema.Types.ObjectId
    - ref: "User"
  
- Text: 
    - image: String 
	- default: false 

- isVerified: 
    - type: Boolean
    - default: false

# CommentModel   

- user: 
    - type: Schema.Types.ObjectId
    -  ref: "User"
  
- text: 
    - type: String
    - required: true

- newLink: {
    - type: String

- news: {
    - type: Schema.Types.ObjectId
    - ref: "News"


## Enlaces

### Git
[Repository Link](https://github.com/JoseDonaire/FrikiNews)
[Deploy Link](https://frikinews.herokuapp.com/)

### Diapositivas