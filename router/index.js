const { Router } = require("express")
const router = Router()
const isVaildation = require("../middlewares/vaildations")

/**
 * Member,Post,Comment,Follow,Vote 폴더를 구성해 파일 분리
 */
router.use("/", require("./Member"))
router.use("/post", isVaildation, require("./Post"))
router.use("/comment", isVaildation, require("./Comment"))
router.use("/follow", isVaildation, require("./Follow"))
router.use("/vote", isVaildation, require("./Vote"))

module.exports = router
