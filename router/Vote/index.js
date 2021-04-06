const { Router } = require("express")
const VoteController = require("./controller")
const VoteRouter = Router()

/**
 * /post/
 */

VoteRouter.post("/", VoteController.creatVote)
VoteRouter.get("/", VoteController.getVote)
VoteRouter.get("/:voteId", VoteController.getVoteDetail)
VoteRouter.patch("/:voteId", VoteController.doVote)
// VoteRouter.patch("/:voteId", VoteController.editVote)
// VoteRouter.delete("/:voteId", VoteController.deleteVote)

module.exports = VoteRouter
