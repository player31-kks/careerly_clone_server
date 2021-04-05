const { Router } = require("express")
const router = Router()

router.use("/", require("./Member"))
router.use("/post", require("./Post"))
router.use("/comment", require("./Comment"))

module.exports = router
