const { Schema, model } = require("mongoose");

const newsSchema = new Schema(
  {
    category: {
      type: String,
      enum: ["movies", "comics",'series','video game', 'other'],
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
    userSignature: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    newImage: { 
      image: String,  //usar cludinary,  y opcional subir imagen. 
	  default: false //si el usuario no sube la imagen tiene un valor predeterminado(imagen generica)
    },
  
    isVerified: {
        type: booleano,
        default: false
    },
    timestamps: true
  },
);

const News = model("News", newsSchema);

module.exports = News;