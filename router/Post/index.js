const { Router } = require("express")
const PostController = require("./controller")
const PostRouter = Router()

/**
 * /post/
 */

PostRouter.get("/user/:userId", PostController.getUserPost)
PostRouter.get("/recommend/:userId", PostController.getRecommendUserPost)
PostRouter.patch("/recommend/:postId", PostController.recommendPost)
PostRouter.delete("/recommend/:postId", PostController.unrecommendPost)
PostRouter.patch("/share/:postId", PostController.sharePost)
PostRouter.patch("/:postId", PostController.editPost)
PostRouter.delete("/:postId", PostController.deletePost)
PostRouter.get("/:postId", PostController.getPostDetail)
PostRouter.get("/:postId/recommend", PostController.getRecommendPeople)
PostRouter.post("/", PostController.creatPost)
PostRouter.get("/", PostController.getPostByPage)

module.exports = PostRouter
