const { User } = require("../../models/")
// user에 대한 선택적인 정보를 가지기 위해서 설정
const userSelect = ["name", "role", "userImg", "followerCnt", "followingCnt"]

/**
 * Follow에 대한 CRUD
 * 로그인 한 후의 기능이기 때문에 vaildation을 거쳐야함
 */

exports.getFollower = async (req, res, next) => {
  const { userId } = req.params
  try {
    const user = await User.findById(userId)
      .populate({
        path: "follower",
        select: userSelect,
      })
      .select([...userSelect, "follower"])
    return res.send({ result: user })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ err: err.message })
  }
}
exports.getFollowing = async (req, res, next) => {
  const { userId } = req.params
  try {
    const user = await User.findById(userId)
      .populate({
        path: "following",
        select: userSelect,
      })
      .select([...userSelect, "following"])
    return res.send({ result: user })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ err: err.message })
  }
}
exports.Follow = async (req, res, next) => {
  const { followId } = req.body
  const user = res.locals.user
  const me = await User.findById(user)
  if (!followId) {
    return res.status(400).send({ err: "팔로우할 아이디가 없습니다." })
  }
  if (followId === user) {
    return res.status(400).send({ err: "본인을 팔로우 누르셨습니다." })
  }
  if (me.following.includes(followId)) {
    return res.status(400).send({ err: "이미 팔로잉한 사람은 다시 팔로잉 할수 없습니다." })
  }
  try {
    await Promise.all([
      User.findByIdAndUpdate(user, { $push: { following: followId }, $inc: { followingCnt: 1 } }),
      User.findByIdAndUpdate(followId, { $push: { follower: user }, $inc: { followerCnt: 1 } }),
    ])
    return res.send({ success: true })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ err: err.message })
  }
}
exports.unFollow = async (req, res, next) => {
  const { followId } = req.body
  const user = res.locals.user
  const me = await User.findById(user)
  if (!followId) {
    return res.status(400).send({ err: "팔로우할 아이디가 없습니다." })
  }
  if (followId === user) {
    return res.status(400).send({ err: "본인을 팔로우 누르셨습니다." })
  }
  if (!me.following.includes(followId)) {
    return res.status(400).send({ err: "팔로잉 안한 사람은 팔로잉 취소를 할 수 없습니다." })
  }
  try {
    await Promise.all([
      User.findByIdAndUpdate(user, { $pull: { following: followId }, $inc: { followingCnt: -1 } }),
      User.findByIdAndUpdate(followId, { $pull: { follower: user }, $inc: { followerCnt: -1 } }),
    ])
    return res.send({ success: true })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ err: err.message })
  }
}
