
const { Router } = require("express")
const CommentController = require("./controller")
const CommentRouter = Router()

CommentRouter.post("/comment", CommentController.postComment)
CommentRouter.get("/comment/:postId", MemeberController.getComment)
CommentRouter.patch("/comment/:postId", MemeberController.updateComment)
CommentRouter.delete("/comment", MemeberController.deleteComment)

module.exports = CommentRouter
