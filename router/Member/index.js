const { Router } = require("express")
const MemeberController = require("./controller")
const MemberRouter = Router()
/**
 * /login
 * /register
 */

MemberRouter.post("/login", MemeberController.login)
MemberRouter.post("/register", MemeberController.register)
MemberRouter.get("/member", MemeberController.findMemberByQuery)
MemberRouter.get("/member/:userId", MemeberController.findMemberById)
MemberRouter.get("/user", MemeberController.getUser)
MemberRouter.post("/user", MemeberController.UpdateUser)
MemberRouter.patch("/user", MemeberController.editUser)
MemberRouter.patch("/password", MemeberController.findPassword)
MemberRouter.put("/password", MemeberController.editPassword)

module.exports = MemberRouter
