const { Router } = require("express")
const FollowController = require("./controller")
const FollowRouter = Router()

FollowRouter.get("/follower/:userId", FollowController.getFollower)
FollowRouter.get("/following/:userId", FollowController.getFollowing)
FollowRouter.post("/", FollowController.addFollow)
FollowRouter.delete("/", FollowController.deleteFollow)

module.exports = FollowRouter
