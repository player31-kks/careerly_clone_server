const { Router } = require("express")
const MemeberController = require("./controller")
const MemberRouter = Router()
const isVaildation = require("../../middlewares/vaildations")
/**
 * /login
 * /register
 */

MemberRouter.post("/login", MemeberController.login)
MemberRouter.post("/register", MemeberController.register)
MemberRouter.post("/checkEmail", MemeberController.checkEmail)
MemberRouter.get("/member", isVaildation, MemeberController.findMemberByQuery)
MemberRouter.get("/member/:userId", isVaildation, MemeberController.findMemberById)
MemberRouter.get("/user", isVaildation, MemeberController.getUser)
MemberRouter.put("/user", isVaildation, MemeberController.UpdateUser)
MemberRouter.patch("/user", isVaildation, MemeberController.editUser)
MemberRouter.get("/password", MemeberController.findPassword)
// MemberRouter.patch("/password", MemeberController.editPassword)

module.exports = MemberRouter
