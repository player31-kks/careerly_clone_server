const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    cotent: { type: String, required: true },
    // category: 
    user: { type: Types.ObjectId, required: true, ref: "User" },
    createAt: Date,
    updateAt: Date
})


const Comment = model("Comment", CommentSchema)
module.exports = Comment
