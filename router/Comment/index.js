const { Router } = require("express")
const CommentController = require("./controller")
const CommentRouter = Router()

CommentRouter.post("/:postId", CommentController.createComment)
CommentRouter.get("/:postId", CommentController.getComment)
// CommentRouter.patch("/comment/:postId", CommentController.updateComment)
// CommentRouter.delete("/comment", CommentController.deleteComment)

module.exports = CommentRouter
