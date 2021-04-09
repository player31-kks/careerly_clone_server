const { Router } = require("express")
const MemeberController = require("./controller")
const MemberRouter = Router()
const isVaildation = require("../../middlewares/vaildations")
const upload = require("../../middlewares/imgUpload")
const passport = require("passport")
const vaildation = passport.authenticate("jwt", { session: false })

// 자세한 코드는 controller에서 확인 가능

// 로그인 / 토큰 발행
MemberRouter.post("/login", MemeberController.login)
// 회원가입
MemberRouter.post("/register", MemeberController.register)
// 이미 있는 이메일인지 확인
MemberRouter.post("/checkEmail", MemeberController.checkEmail)
// 카테고리 별 또는 이름으로 사용자 검색
MemberRouter.get("/member", isVaildation, MemeberController.findMemberByQuery)
// 사용자 아이디 값으로 검색
MemberRouter.get("/member/:userId", isVaildation, MemeberController.findMemberById)
// 사용자 상제 정보
MemberRouter.get("/user", vaildation, MemeberController.getUser)
// 사용자 프로필 편집(프로필 사진, 이름, 직함, 자기소개, 커리어, 학력)
MemberRouter.put("/user", isVaildation, upload.single("img"), MemeberController.UpdateUser)
// 사용자 계정 정보 변경(이메일)
MemberRouter.patch("/user", isVaildation, MemeberController.editUser)
// 비밀번호 찾기(이메일을 넣으면 이메일로 비밀번호가 보내짐, nodemailer 사용)
MemberRouter.post("/password", MemeberController.findPassword)
// 비밀번호 변경
MemberRouter.patch("/password", isVaildation, MemeberController.changePassword)

module.exports = MemberRouter
