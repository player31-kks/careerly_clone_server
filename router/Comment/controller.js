const { Comment, Post, Vote, User } = require("../../models")
const { isValidObjectId } = require("mongoose")

exports.postComment = async (req, res, next) => {
  const userId = res.locals.user
  // const userId = "606baceb859fdd2ba468072b"
  const { postId } = req.params
  const { content } = req.body
  if (!content) {
    return res.status(400).send({ err: "코멘트가 비었습니다." })
  }
  const NewComment = new Comment({
    content,
    user: userId,
  })
  try {
    await Promise.all([
      NewComment.save(),
      Post.updateOne({ _id: postId }, { $push: { comment: NewComment._id } }),
    ])
    return res.send({ success: true })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ err: err.meassage })
  }
}

exports.getComment = async (req, res, next) => {
  const { postId } = req.params
  const userSelect = ["name", "userImg", "role"]
  const comments = await Post.findOne({ _id: postId })
    .populate({
      path: "comment",
      populate: { path: "user", select: userSelect },
    })
    .select(["comment"])
  return res.send({ result: comments })
}

// exports.updateComment = async (req, res, next) => {
//   const { postId } = req.params
//   if (!content) {
//     return res.status(400).send({ err: "코멘트가 비었습니다." })
//   }
//   await Comment.findByIdAndUpdate(postId, { content })
//   return res.send({ success: true })
// }

// exports.deleteComment = async (req, res, next) => {
//   const { _id } = req.body
//   const { postId } = req.params
//   await Comment.findByIdAndDelete(_id)
//   return res.send({ success: true })
// }
