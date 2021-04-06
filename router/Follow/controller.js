const { User } = require("../../models/")

exports.getFollower = async (req, res, next) => {
  const { userId } = req.params
  const userSelect = ["name", "role", "userImg"]
  try {
    const user = await User.findById(userId)
      .populate({
        path: "follower",
        select: userSelect,
      })
      .select(["name", "role", "userImg", "follower"])
    return res.send({ result: user })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ err: err.message })
  }
}
exports.getFollowing = async (req, res, next) => {
  const { userId } = req.params
  const userSelect = ["name", "role", "userImg"]
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
exports.addFollow = async (req, res, next) => {
  const { followId } = req.body
  const user = res.locals.user
  try {
    await Promise.all([
      User.findByIdAndUpdate(user, { $push: { following: followId } }),
      User.findByIdAndUpdate(followId, { $push: { follower: user } }),
    ])
    return res.send({ success: true })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ err: err.message })
  }
}
exports.deleteFollow = async (req, res, next) => {
  const { followId } = req.body
  const user = res.locals.user
  try {
    await Promise.all([
      User.findByIdAndUpdate(user, { $pull: { following: followId } }),
      User.findByIdAndUpdate(followId, { $pull: { follower: user } }),
    ])
    return res.send({ success: true })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ err: err.message })
  }
}
