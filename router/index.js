const fs = require("fs")
const path = require("path")
const basename = path.basename(__filename)
const { Router } = require("express")
const router = Router()

// fs.readdirSync(__dirname)
//     .filter((folder) => {
//         return folder !== basename
//     })
//     .forEach((folder) => {
//         router.use("/", require(`./${folder}`))
//     })

router.use("/", require("./Member"))
router.use("/post", require("./Post"))

module.exports = router
