const { Router } = require("express")
const FollowController = require("./controller")
const FollowRouter = Router()

// 자세한 코드는 controller에서 확인 가능
// 사용자의 팔로워를 가져오기
FollowRouter.get("/follower/:userId", FollowController.getFollower)
// 사용자의 팔로잉을 가져오기
FollowRouter.get("/following/:userId", FollowController.getFollowing)
// 다른 사용자를 팔로우하기
FollowRouter.post("/", FollowController.Follow)
// 팔로우 해제하기
FollowRouter.delete("/", FollowController.unFollow)

module.exports = FollowRouter
