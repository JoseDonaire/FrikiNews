const { Schema, model } = require("mongoose");
const categoriesArr = require('../utils/categories.js')

const newsSchema = new Schema(
  {
    category: {
      type: String,
      enum: categoriesArr,
      required: true
    },
  
    title: {
      type: String,
      unique: true,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    

    },
    newImage: { 
      image: String,  //usar cludinary,  y opcional subir imagen. 
	  default: false //si el usuario no sube la imagen tiene un valor predeterminado(imagen generica)
    },
  
    isVerified: {
        type: Boolean,
        default: false
    },
    
  },
  {timestamps: true}
);

const News = model("News", newsSchema);

module.exports = News;