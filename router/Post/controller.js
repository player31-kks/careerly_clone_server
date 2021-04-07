const { Post } = require("../../models")
const { populate } = require("../../models/comment")

const userSelect = ["name", "role", "userImg"]
const postSelect = ["user", "content", "sharedCnt", "recommendedCnt", "commentCnt", "createdAt"]

exports.creatPost = async (req, res, next) => {
  const userId = res.locals.user
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
  let { page } = req.query
  page = page || 0
  const post = await Post.find({})
    .populate([{ path: "user", select: userSelect }])
    .select(postSelect)
    .sort({ updateAt: -1 })
    .skip(page * 5)
    .limit(5)
  return res.send({ result: post })
}
exports.getPostDetail = async (req, res, next) => {
  const { postId } = req.params
  try {
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
  try {
    const post = await Post.find({ _id: postId })
      .populate({ path: "recommended", select: userSelect })
      .select(["recommended", "recommendedCnt"])
    return res.send({ result: post })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ err: err.meassage })
  }
}
exports.getUserPost = async (req, res, next) => {
  const { userId } = req.params
  try {
    const posts = await Post.find({ user: userId })
      .populate({
        path: "recommended",
        select: userSelect,
      })
      .select(postSelect)
    return res.send({ result: posts })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ err: err.meassage })
  }
}
exports.getRecommendUserPost = async (req, res, next) => {
  const { userId } = req.params
  try {
    const recommendPost = await Post.find({ recommended: { $in: userId } })
      .populate({
        path: "recommended",
        select: userSelect,
      })
      .select([...postSelect, "recommended"])
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
        $inc: { recommendedCnt: 1 },
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
