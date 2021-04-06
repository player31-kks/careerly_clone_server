const { Router } = require("express")
const router = Router()

router.use("/", require("./Member"))
router.use("/post", require("./Post"))
router.use("/comment", require("./Comment"))
router.use("/follow", require("./Follow"))
router.use("/vote", require("./Vote"))

module.exports = router
