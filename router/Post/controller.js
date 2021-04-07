const { Post } = require("../../models")
const { populate } = require("../../models/comment")

exports.creatPost = async (req, res, next) => {
  // const userId = res.locals.user
  const { content, url, userId } = req.body

  if (typeof content !== "string")
    return res.status(400).send({ err: "내용이 형식에 맞지 않습니다." })
  const post = new Post({ ...req.body, user: userId })
  try {
    await post.save()
    return res.send({ post })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ err: err.meassage })
  }
}
exports.getPostByPage = async (req, res, next) => {
  let { page } = req.query
  page = page || 0
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
  return res.send({ result: post })
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
exports.getRecommendPeople = async (req, res, next) => {
  const { postId } = req.body
  const userSelect = ["name", "role", "userImg"]
  try {
    const post = await Post.find({ _id: postId })
      .populate({ path: "recommended", select: userSelect })
      .select(["recommended"])
    return res.send({ result: post })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ err: err.meassage })
  }
}
exports.getUserPost = async (req, res, next) => {
  const { userId } = req.params
  const userSelect = ["name", "role", "userImg"]
  try {
    const posts = await Post.find({ user: userId })
      .populate({
        path: "recommended",
        select: userSelect,
      })
      .select(["-shared", "-comment"])
    return res.send({ result: posts })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ err: err.meassage })
  }
}
exports.getRecommendUserPost = async (req, res, next) => {
  const { userId } = req.params
  const userSelect = ["name", "role", "userImg"]
  try {
    const recommendPost = await Post.find({ recommended: { $in: userId } })
      .populate({
        path: "recommended",
        select: userSelect,
      })
      .select(["-shared", "-comment"])
    return res.send({ result: recommendPost })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ err: err.meassage })
  }
}
exports.recommendPost = async (req, res, next) => {
  const { postId } = req.params
  const userId = res.locals.user
  try {
    await Post.updateOne(
      { _id: postId },
      {
        $push: { recommended: userId },
      }
    )
    return res.send({ success: true })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ err: err.meassage })
  }
}
exports.sharePost = async (req, res, next) => {
  return res.send({ success: true })
}
exports.editPost = async (req, res, next) => {
  const { postId } = req.params
  const { content, url } = req.body
  if (!content) {
    return res.status(400).send({ err: "내용이 비었습니다." })
  }
  try {
    await Post.findByIdAndUpdate(postId, { ...req.body })
    return res.send({ success: true })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ err: err.meassage })
  }
}
exports.deletePost = async (req, res, next) => {
  const { postId } = req.params
  try {
    await Post.findByIdAndDelete(postId)
    return res.send({ success: true })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ err: err.meassage })
  }
}
