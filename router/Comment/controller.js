const { Comment, Post } = require("../../models")

/**
 * Comment에 대한 CRUD
 * 로그인 한 후의 기능이기 때문에 vaildation을 거쳐야함
 * careely에서 댓글 수정 및 삭제가 존재하지 않아서 U,D는 구현하고 주석처리함
 */

exports.createComment = async (req, res, next) => {
  const userId = res.locals.user
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
    // Comment 생성 과 Post 생성을 동시에 함
    // post Update시 comment에 넣고 CommnetCnt 증가
    await Promise.all([
      NewComment.save(),
      Post.updateOne(
        { _id: postId },
        {
          $push: { comment: NewComment._id },
          $inc: { commentCnt: 1 },
        }
      ),
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
    .select(["comment", "commentCnt"])
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
