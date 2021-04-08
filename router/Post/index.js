const { Router } = require("express")
const PostController = require("./controller")
const PostRouter = Router()

// 자세한 코드는 controller에서 확인 가능
// 게시글 작성
PostRouter.post("/", PostController.creatPost)
// 게시글 전체 보기 / 피드 가져오기
PostRouter.get("/", PostController.getPostByPage)
// 해당 게시글 상세 보기
PostRouter.get("/:postId", PostController.getPostDetail)
// 이 게시글을 추천한 사람을 확인
PostRouter.get("/:postId/recommend", PostController.getRecommendPeople)
// 사용자가 작성한 게시글 가져오기
PostRouter.get("/user/:userId", PostController.getUserPost)
// 이 게시글를 추천한 사람을 가져오기
PostRouter.get("/recommend/:userId", PostController.getRecommendUserPost)
// 이 게시글 추천
PostRouter.patch("/recommend/:postId", PostController.recommendPost)
// 게시글 추천을 해제
PostRouter.delete("/recommend/:postId", PostController.unrecommendPost)
// 게시글을 share
PostRouter.patch("/share/:postId", PostController.sharePost)
// 게시글을 수정
PostRouter.patch("/:postId", PostController.editPost)
// 게시글을 삭제
PostRouter.delete("/:postId", PostController.deletePost)

module.exports = PostRouter
