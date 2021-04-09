const { Post } = require("../../models")
const { populate } = require("../../models/comment")

const userSelect = ["name", "role", "userImg", "followerCnt", "followingCnt"]
const postSelect = [
  "user",
  "content",
  "url",
  "sharedCnt",
  "recommendedCnt",
  "commentCnt",
  "createdAt",
]

/**
 * Post에 대한 CRUD
 * 전체 게시물, 내 전용 페이지에 대한 게시물
 * 추천하기, 공유하기 기능이 존재
 * 로그인 한 후의 기능이기 때문에 vaildation을 거쳐야함
 *
 */

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
    .select(["recommended", ...postSelect])
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
      { path: "comment", populate: { path: "user", select: userSelect } },
    ])
    return res.send({ result: post })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ err: err.meassage })
  }
}
exports.getRecommendPeople = async (req, res, next) => {
  const { postId } = req.params
  try {
    const post = await Post.findOne({ _id: postId })
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
    const post = await Post.findOne({ _id: postId })
    if (post.recommended.includes(userId)) {
      return res.status(400).send({ err: "추천을 한 사람은 다시 한번 추천할 수 없습니다." })
    }
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

exports.unrecommendPost = async (req, res, next) => {
  const { postId } = req.params
  const userId = res.locals.user
  try {
    const post = await Post.findOne({ _id: postId })
    if (!post.recommended.includes(userId)) {
      return res.status(400).send({ err: "추천을 안한 사람은 추천을 취소할 수 없습니다." })
    }
    await Post.updateOne(
      { _id: postId },
      {
        $pull: { recommended: userId },
        $inc: { recommendedCnt: -1 },
      }
    )
    return res.send({ success: true })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ err: err.meassage })
  }
}

exports.sharePost = async (req, res, next) => {
  const { postId } = req.params
  await Post.updateOne({ _id: postId }, { $inc: { sharedCnt: 1 } })
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
