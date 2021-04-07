const { Router } = require("express")
const MemeberController = require("./controller")
const MemberRouter = Router()
const isVaildation = require("../../middlewares/vaildations")
const path = require("path")
const multer = require('multer')
const imageController = require("./controller");
const upload = multer({
    storage: multer.diskStorage({
        // set a localstorage destination
        destination: (req, file, cb) => {
            cb(null, 'uploads/');
        },
        // convert a file name
        filename: (req, file, cb) => {
            cb(null, new Date().valueOf() + path.extname(file.originalname));
        },
    }),
});
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
MemberRouter.post("/password", MemeberController.findPassword)
MemberRouter.patch("/password", MemeberController.changePassword)
MemberRouter.post("/user", upload.single('img'), MemeberController.changeUserImg)

module.exports = MemberRouter
