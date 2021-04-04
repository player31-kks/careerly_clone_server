const fs = require("fs")
const path = require("path")
const basename = path.basename(__filename)
const DB = {}

const capitalize = (s) => {
    if (typeof s !== "string") return ""
    return s.charAt(0).toUpperCase() + s.slice(1, s.length - 1)
}

fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".js"
        )
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))
        const modelName = model.collection.collectionName
        DB[capitalize(modelName)] = model
    })

DB.Post = require("./post")
DB.Comment = require("./comment")
DB.User = require("./user")
DB.Vote = require("./vote")
module.exports = DB
