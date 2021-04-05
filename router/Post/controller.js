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
  const { page } = req.params
  const userSelect = ["name", "role", "userImg"]
  const post = await Post.find({})
    .populate([
      { path: "user", select: userSelect },
      { path: "recommended", select: userSelect },
      {
        path: "comment",
        populate: { path: "user", select: userSelect },
      },
    ])
    .sort({ updateAt: -1 })
    .skip(page * 5)
    .limit(5)
  return res.send({ success: true })
}
exports.getPostDetail = async (req, res, next) => {
  const { postId } = req.params
  try {
    const userSelect = ["name", "role", "userImg"]
    const post = await Post.findById(postId).populate([
      { path: "user", select: userSelect },
      { path: "recommended", select: userSelect },
      { path: "comment", populate: { path: "user", select: userSelect } },
    ])
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
