const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
    {
    userSignature: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    text: {
        type: String,
        required: true
    },
    newLink: {
        type: String,
    },
    news: {
        type: Schema.Types.ObjectId,
        ref: "News"
    },
    
    },
    
    {
        timestamps: true
    },
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;