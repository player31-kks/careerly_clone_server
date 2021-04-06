const { User, Post } = require("../../models")
const { isValidObjectId } = require("mongoose")
const { findUserByIdConfig } = require("./MemberConfig")
require("dotenv").config()
const jwt = require("jsonwebtoken")

exports.login = async (req, res, next) => {
  const { email, password } = req.body
  if (typeof email !== "string") return res.status(400).send({ err: "이메일 형식이 틀렸습니다." })
  if (typeof password !== "string")
    return res.status(400).send({ err: "비밀번호가 형식이 틀렸습니다." })
  try {
    const user = await User.findOne().and([{ email }, { password }])
    if (!user) return res.status(400).send({ err: "이메일 혹은 비밀번호가 일치하지 않습니다." })
    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY)
    return res.send({ result: { user: { token: token } } })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ err: err.message })
  }
}
exports.register = async (req, res, next) => {
  const { name, email, password, role } = req.body

  if (typeof name !== "string") return res.status(400).send({ err: "이름 형식이 틀립니다." })
  if (typeof email !== "string") return res.status(400).send({ err: "이메일 형식이 틀렸습니다." })
  if (typeof password !== "string")
    return res.status(400).send({ err: "비밀번호가 형식이 틀렸습니다." })
  if (typeof role !== "string") return res.status(400).send({ err: "직함 형식이 틀렸습니다." })

  const user = await User.findOne({ email })
  if (user) return res.status(400).send({ err: "이미 존재하는 사용자입니다." })

  const NewUser = new User({ ...req.body })
  try {
    await NewUser.save()
    return res.send({ success: true })
  } catch (err) {
    return res.status(400).send({ err: err.message })
  }
}
exports.checkEmail = async (req, res, next) => {
  const { email } = req.body
  const user = await User.findOne({ email })
  if (user) {
    return res.send({ success: false })
  } else {
    return res.send({ success: true })
  }
}
exports.findMemberByQuery = async (req, res, next) => {
  const { category, search, page } = req.query
  if (search) {
    try {
      const users = await User.find({ name: search }).select(["name", "role", "userImg"])
      return res.send({ result: users })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ err: err.message })
    }
  }
}
exports.findMemberById = async (req, res, next) => {
  const { userId } = req.params
  if (!isValidObjectId(userId))
    return res.status(400).send({ err: "찾으려는 아이디형식이 틀렸습니다." })
  try {
    const user = await User.findById(userId).select(findUserByIdConfig)
    return res.send({ result: user })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ err: err.message })
  }
}
exports.getUser = async (req, res, next) => {
  // const userId = res.locals.user
  const { userId } = req.body
  if (!isValidObjectId(userId)) return res.status(400).send({ err: "유저 아이디 형식이 다릅니다." })
  try {
    const [user, posts] = await Promise.all([
      User.findById(userId).select(["name", "role"]),
      Post.find({ recommended: { $in: userId } }).select(["content", "createAt"]),
    ])
    return res.send({ result: { user, posts } })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ err: err.message })
  }
}
exports.UpdateUser = async (req, res, next) => {
  // const userId = res.locals.user._id
  const userId = "606baceb859fdd2ba468072b"
  if (!isValidObjectId(userId)) return res.status(400).send({ err: "유저 아이디 형식이 다릅니다." })
  try {
    await User.findByIdAndUpdate(userId, { ...req.body })
    return res.send({ success: true })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ err: err.message })
  }
}
exports.editUser = async (req, res, next) => {
  const { email } = req.body
  // const userId = res.locals.user._id
  const userId = "606baceb859fdd2ba468072b"
  if (typeof email !== "string") return res.status(400).send({ err: "이메일 형식이 틀립니다." })
  try {
    await User.findByIdAndUpdate(userId, { email })
    return res.send({ success: true })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ err: err.message })
  }
}
exports.findPassword = async (req, res, next) => {
  const { email } = req.body
  return res.send({ email })
}
exports.editPassword = async (req, res, next) => {
  const { email } = req.body
  return res.send({ email })
}
