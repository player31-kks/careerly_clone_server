const { Schema, model, Types } = require("mongoose")

const CommentSchema = Schema(
  {
    content: { type: String, required: true },
    user: { type: Types.ObjectId, required: true, ref: "User" },
  },
  {
    timestamps: true,
  }
)

const Comment = model("Comment", CommentSchema)
module.exports = Comment
