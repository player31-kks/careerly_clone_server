const { Router } = require("express")
const router = Router()
const isVaildation = require("../middlewares/vaildations")

// 아이피 뒤에 첫 주소가 붙는 인덱스 코드
// 멤버에는 로그인 회원가입 등이 있다.
router.use("/", require("./Member"))
router.use("/post", isVaildation, require("./Post"))
router.use("/comment", isVaildation, require("./Comment"))
router.use("/follow", isVaildation, require("./Follow"))
router.use("/vote", isVaildation, require("./Vote"))

module.exports = router
