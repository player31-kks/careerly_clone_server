const { Comment, Post, Vote, User } = require("../../models")
const { isValidObjectId } = require("mongoose")

exports.postComment = async (req, res, next) => {
    const userId = res.locals.user._id
    const { postId } = req.params
    const { content } = req.body
    if (!content) {
        return res.status(400).send({ err: "코멘트가 비었습니다." })
    }
    var NewComment = new Comment({
        content,
        user: userId,
        post: postId
    })
    await NewComment.save()
    return res.send({ success: true })
}
exports.updateComment = async (req, res, next) => {
    return res.send({ success: true })
}
exports.deleteComment = async (req, res, next) => {
    return res.send({ success: true })
}
exports.getComment = async (req, res, next) => {
    const { postId } = req.params

    const comments = await Comment.find({ postId })

    // 각각의 코멘트 마다 userId를 가져와서
    const user = await User.findById(userId)


    return res.send({ result: user comment })
}