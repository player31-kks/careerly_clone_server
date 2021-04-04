const { Post } = require("../../models")

exports.creatPost = async (req, res, next) => {
    const userId = res.locals.user._id
    const { content, url } = req.body

    if (typeof content !== "string")
        return res.status(400).send({ err: "내용이 형식에 맞지 않습니다." })
    if (url) {
        const post = new Post({
            content,
            url,
            user: userId,
        })
        await post.save()
    } else {
        const post = new Post({
            content,
            user: userId,
        })
        await post.save()
    }
    return res.send({ success: true })
}
exports.getPostByPage = async (req, res, next) => {
    return res.send({ success: true })
}
exports.getPostDetail = async (req, res, next) => {
    return res.send({ success: true })
}
exports.getRecommendPeopel = async (req, res, next) => {
    return res.send({ success: true })
}
exports.getUserPost = async (req, res, next) => {
    return res.send({ success: true })
}
exports.getRecommendUserPost = async (req, res, next) => {
    return res.send({ success: true })
}
exports.RecommendPost = async (req, res, next) => {
    return res.send({ success: true })
}
exports.editPassword = async (req, res, next) => {
    return res.send({ success: true })
}
