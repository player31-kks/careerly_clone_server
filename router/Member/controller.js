const { User } = require("../../models")
const { isValidObjectId } = require("mongoose")
const { findUserByIdConfig } = require("./MemberConfig")
require("dotenv").config()
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const passport = require("passport")

/**
 * User에 대한 CRUD
 * 로그인,회원가입,이메일 체크
 * 로그인 한 후의 기능이기 때문에 vaildation을 거쳐야함
 */

// jwt 사용한 로그인과 회원가입
exports.login = async (req, res, next) => {
  // const { email, password } = req.body
  // if (typeof email !== "string") return res.status(400).send({ err: "이메일 형식이 틀렸습니다." })
  // if (typeof password !== "string")
  //   return res.status(400).send({ err: "비밀번호가 형식이 틀렸습니다." })
  // try {
  //   const user = await User.findOne().and([{ email }, { password }])
  //   if (!user) return res.status(400).send({ err: "이메일 혹은 비밀번호가 일치하지 않습니다." })
  //   const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY)
  //   return res.send({ result: { user: { token: token } } })
  // } catch (err) {
  //   console.log(err)
  //   return res.status(400).send({ err: err.message })
  // }
  passport.authenticate("local", { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user: user,
      })
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err)
      }
      const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY)
      return res.json({ token })
    })
  })(req, res)
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

// category query는 직함을 기준으로 찾는다
// search query는 이름을 기준으로 찾는다 (정규표현식을 사용) 한글짜라도 일치하면 찾음.
exports.findMemberByQuery = async (req, res, next) => {
  const { category, search } = req.query
  let { page } = req.query
  page = page || 0
  const userSelect = ["name", "role", "userImg", "followingCnt", "followerCnt"]

  if (category) {
    try {
      const users = await User.find({ role: category })
        .select(userSelect)
        .skip(page * 5)
        .limit(5)
      return res.send({ result: users })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ err: err.message })
    }
  }
  if (search) {
    try {
      const query = new RegExp(search)
      const users = await User.find({ name: query })
        .select(userSelect)
        .skip(page * 5)
        .limit(5)
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
  const userId = res.locals.user || req.user
  if (!isValidObjectId(userId)) return res.status(400).send({ err: "유저 아이디 형식이 다릅니다." })
  try {
    const user = await User.findOne({ _id: userId }).select({
      password: 0,
      follower: 0,
      following: 0,
    })
    return res.send({ result: { user } })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ err: err.message })
  }
}

exports.UpdateUser = async (req, res, next) => {
  const userId = res.locals.user
  if (!isValidObjectId(userId)) return res.status(400).send({ err: "유저 아이디 형식이 다릅니다." })
  try {
    if (req.file) {
      const userImg = req.file.path
      const user = await User.findByIdAndUpdate(userId, { userImg, ...req.body })
    } else {
      await User.findByIdAndUpdate(userId, { ...req.body })
    }
    return res.send({ success: true })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ err: err.message })
  }
}

exports.editUser = async (req, res, next) => {
  const { email } = req.body
  const userId = res.locals.user
  if (typeof email !== "string") return res.status(400).send({ err: "이메일 형식이 틀립니다." })
  try {
    await User.findByIdAndUpdate(userId, { email })
    return res.send({ success: true })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ err: err.message })
  }
}

// nodemailer를 이용해서 이메일로 비밀번호를 전달해줌
exports.findPassword = async (req, res, next) => {
  console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS)
  const main = async () => {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })
    const { email } = req.body
    const user = await User.findOne({ email })
    let info = await transporter.sendMail({
      from: `"WDMA Team"`,
      to: `${user.email}`,
      subject: "커리어리 클론 코딩 비밀번호입니다",
      text: "ㅠㅠ",
      html: `<b>${user.password}</b>`,
    })

    console.log("Message sent: %s", info.messageId)
    res.status(200).json({
      status: "Success",
      code: 200,
      message: "Sent Auth Email",
    })
  }

  main().catch(console.error)
  return res.send({ success: true })
}

exports.changePassword = async (req, res, next) => {
  const { password, newPassword, newPassCheck } = req.body
  const userId = res.locals.user

  const currentPass = await User.find({ _id: userId }).and([{ password }])
  if (currentPass !== password) return res.status(400).send({ err: "현재 비밀번호가 다릅니다." })
  if (newPassword !== newPassCheck)
    return res.status(400).send({ err: "새 비밀번호가 서로 다릅니다." })
  try {
    await User.findByIdAndUpdate(userId, { password: newPassword })
    return res.send({ success: true })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ err: err.message })
  }
}

// exports.changeUserImg = async (req, res, next) => {
//   const userId = res.locals.user
//   console.log(req.file)
//   try {
//     await User.findByIdAndUpdate(userId, { userImg: req.file.filename })
//     return res.send({ success: true })
//   } catch (err) {
//     console.log(err)
//     return res.status(400).send({ err: err.message })
//   }
// }
