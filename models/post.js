const { required } = require("joi")
const { Schema, model, Types } = require("mongoose")

// 게시글 db의 형태
const PostSchema = new Schema(
  {
    // content: 게시글 내용 / url: 게시글에 첨부된 링크 / user: 게시글 작성자
    content: { type: String, required: true },
    url: { type: String },
    user: { type: Types.ObjectId, required: true, ref: "User" },
    // shared: 해당 글 쉐어한 사용자 id / recommended: 해당 글 추천한 사용자 id
    shared: {
      type: [{ type: Types.ObjectId, required: true, ref: "User" }],
    },
    recommended: {
      type: [{ type: Types.ObjectId, required: true, ref: "User" }],
    },
    // comment: 코멘트 db에 저장된 코멘트의 id
    comment: {
      type: [{ type: Types.ObjectId, required: true, ref: "Comment" }],
    },
    // sharedCnt: 해당 글이 쉐어된 횟수 / recommendedCnt: 해당 글이 추천된 횟수
    sharedCnt: { type: Number, required: true, default: 0 },
    recommendedCnt: { type: Number, required: true, default: 0 },
    // commentCnt: 해당 글의 댓글 수
    commentCnt: { type: Number, required: true, default: 0 },
  },
  {
    // createdAt, updatedAt 자동 생성
    timestamps: true,
  }
)

const Post = model("Post", PostSchema)
module.exports = Post
