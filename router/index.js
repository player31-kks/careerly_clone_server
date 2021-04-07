const { Router } = require("express")
const router = Router()
const isVaildation = require("../middlewares/vaildations")

router.use("/", require("./Member"))
router.use("/post", isVaildation, require("./Post"))
router.use("/comment", isVaildation, require("./Comment"))
router.use("/follow", isVaildation, require("./Follow"))
router.use("/vote", isVaildation, require("./Vote"))

module.exports = router
