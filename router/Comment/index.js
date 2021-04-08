const { Router } = require("express")
const CommentController = require("./controller")
const CommentRouter = Router()

// 자세한 코드는 controller에서 확인 가능

// 코멘트 작성
CommentRouter.post("/:postId", CommentController.postComment)
// 코멘트 가져오기
CommentRouter.get("/:postId", CommentController.getComment)
// CommentRouter.patch("/comment/:postId", CommentController.updateComment)
// CommentRouter.delete("/comment", CommentController.deleteComment)

module.exports = CommentRouter
