const DB = {}
DB.Post = require("./post")
DB.Comment = require("./comment")
DB.User = require("./user")
DB.Vote = require("./vote")
// DB호출을 위한 인덱스 파일
module.exports = DB
