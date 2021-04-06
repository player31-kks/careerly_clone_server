const { Router } = require("express")
const PostController = require("./controller")
const PostRouter = Router()

/**
 * /post/
 */

PostRouter.post("/", PostController.creatPost)
PostRouter.get("/", PostController.getPostByPage)
PostRouter.get("/:postId", PostController.getPostDetail)
PostRouter.get("/:postId/recommend", PostController.getRecommendPeople)
PostRouter.get("/user/:userId", PostController.getUserPost)
PostRouter.get("/recommend/:userId", PostController.getRecommendUserPost)
PostRouter.patch("/recommend/:postId", PostController.recommendPost)
PostRouter.patch("/share/:postId", PostController.sharePost)
PostRouter.patch("/share/:postId", PostController.editPost)
PostRouter.delete("/share/:postId", PostController.deletePost)

module.exports = PostRouter
