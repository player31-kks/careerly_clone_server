const { Router } = require("express")
const FollowController = require("./controller")
const FollowRouter = Router()

FollowRouter.get("/follower/:userId", FolloweRouter.getFollower)
FollowRouter.get("/following/:userId", FolloweRouter.getFollowing)
FollowRouter.post("/", FolloweRouter.addFollow)
FollowRouter.delete("/", FolloweRouter.deleteFollow)

module.exports = FollowRouter
