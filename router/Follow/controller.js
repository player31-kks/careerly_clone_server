const User = require("../../models/user")

exports.getFollower = async (req, res, next) => {
  const { userId } = req.params
  const userSelect = ["name", "role", "userImg"]
  try {
    const user = await User.findById(userId)
      .populate({
        path: "follower",
        populate: { path: "user", select: userSelect },
      })
      .select([...userSelect, "follwing"])
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
        populate: { path: "user", select: userSelect },
      })
      .select([...userSelect, "follwing"])
    return res.send({ result: user })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ err: err.message })
  }
}
exports.addFollow = async (req, res, next) => {
  const { followerId } = req.body
  const user = res.locals.user
  try {
    await Promise.all([
      User.findByIdAndUpdate(user, { $push: { follower: followerId } }),
      User.findByIdAndUpdate(followerId, { $push: { following: user } }),
    ])
    return res.send({ success: true })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ err: err.message })
  }
}
exports.deleteFollow = async (req, res, next) => {
  const { followerId } = req.body
  const user = res.locals.user
  try {
    await Promise.all([
      User.findByIdAndUpdate(user, { $pull: { follower: followerId } }),
      User.findByIdAndUpdate(followerId, { $pull: { following: user } }),
    ])
    return res.send({ success: true })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ err: err.message })
  }
}
