const { Router } = require("express")
const PostController = require("./controller")
const PostRouter = Router()

/**
 * /post로 시작하는 곳들
 */

PostRouter.post("/", PostController.creatPost)
PostRouter.get("/", PostController.getPostByPage)
PostRouter.get("/:postId", PostController.getPostDetail)
PostRouter.get("/:postId/recommend", PostController.getRecommendPeopel)
PostRouter.get("/user/:userId", PostController.getUserPost)
PostRouter.get("/recommend/:userId", PostController.getRecommendUserPost)
PostRouter.patch("/recommend/:postId", PostController.RecommendPost)
PostRouter.patch("/share/:postId", PostController.editPassword)

module.exports = PostRouter
