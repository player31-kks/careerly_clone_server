const { required } = require("joi")
const { Schema, model, Types } = require("mongoose")

const PostSchema = new Schema(
  {
    content: { type: String, required: true },
    url: { type: String },
    user: { type: Types.ObjectId, required: true, ref: "User" },
    shared: {
      type: [{ type: Types.ObjectId, required: true, ref: "User" }],
    },
    recommended: {
      type: [{ type: Types.ObjectId, required: true, ref: "User" }],
    },
    comment: {
      type: [{ type: Types.ObjectId, required: true, ref: "Comment" }],
    },
    sharedCnt: { type: Number, required: true, default: 0 },
    recommendedCnt: { type: Number, required: true, default: 0 },
    commentCnt: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
)

const Post = model("Post", PostSchema)
module.exports = Post
