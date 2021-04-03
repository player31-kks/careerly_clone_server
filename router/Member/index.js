const { Router } = require("express")
const MemeberController = require("./controller")
const MemberRouter = Router()

MemberRouter.post("/login", MemeberController.login)
MemberRouter.post("/register", MemeberController.register)
MemberRouter.get("/member", MemeberController.findMemmberByQuery)
MemberRouter.get("/member/:userId", MemeberController.findMemmberById)
MemberRouter.get("/user", MemeberController.getUser)
MemberRouter.patch("/user", MemeberController.editUser)
MemberRouter.patch("/password", MemeberController.findPassword)
MemberRouter.put("/password", MemeberController.editPassword)

module.exports = MemberRouter
