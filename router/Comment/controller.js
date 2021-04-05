const { Comment, Post, Vote } = require("../../models")
const { isValidObjectId } = require("mongoose")

exports.postComment = async (req, res, next) => {
    const userId = res.locals.user._id
    const { content, category } = req.body
    if (!content) {
        return res.status(400).send({ err: "코멘트가 비었습니다." })
    }
    var NewComment = new Comment({
        content,
        user: userId
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
    return res.send({ success: true })
}