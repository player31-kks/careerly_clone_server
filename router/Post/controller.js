const { Post } = require("../../models")

exports.creatPost = async (req, res, next) => {
    const userId = res.locals.user._id
    const { content, url } = req.body

    if (typeof content !== "string")
        return res.status(400).send({ err: "내용이 형식에 맞지 않습니다." })

    const post = new Post({ ...req.body, user: userId })
    try {
        await post.save()
        return res.send({ success: true })
    } catch (err) {
        console.log(err)
        return res.status(400).send({ err: err.meassage })
    }
}
exports.getPostByPage = async (req, res, next) => {
    return res.send({ success: true })
}
exports.getPostDetail = async (req, res, next) => {
    const { postId } = req.body
    try {
        const post = await Post.findById(postId)
            .populate([
                {
                    path: "user",
                    select: ["name,role,userImg"],
                },
                {
                    path: "recommended",
                    populate: { path: "user", select: ["userImg"] },
                },
            ])
            .select({
                shared: 0,
                comment: 0,
            })
        return res.send({ result: post })
    } catch (err) {
        console.log(err)
        return res.status(400).send({ err: err.meassage })
    }
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
