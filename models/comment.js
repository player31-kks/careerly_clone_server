const { Schema, model, Types } = require("mongoose")

// 댓글 db의 형태
const CommentSchema = Schema(
  {
    // content: 댓글의 내용 / user: 댓글 작성자
    content: { type: String, required: true },
    user: { type: Types.ObjectId, required: true, ref: "User" },
  },
  {
    // createdAt, updatedAt 자동 생성
    timestamps: true,
  }
)

const Comment = model("Comment", CommentSchema)
module.exports = Comment
