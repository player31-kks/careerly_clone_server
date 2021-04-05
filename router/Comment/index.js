const { Router } = require("express")
const CommentController = require("./controller")
const CommentRouter = Router()

CommentRouter.post("/comment", CommentController.postComment)
CommentRouter.get("/comment/:postId", CommentController.getComment)
CommentRouter.patch("/comment/:postId", CommentController.updateComment)
CommentRouter.delete("/comment", CommentController.deleteComment)

module.exports = CommentRouter
