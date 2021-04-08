const { Router } = require("express")
const VoteController = require("./controller")
const VoteRouter = Router()

// 자세한 코드는 controller에서 확인 가능
// 투표 카드를 생성
VoteRouter.post("/", VoteController.creatVote)
// 투표 카드를 가져오기
VoteRouter.get("/", VoteController.getVote)
// 투표 카드 상세 보기
VoteRouter.get("/:voteId", VoteController.getVoteDetail)
// 투표 카드 내에서 투표를 실시
VoteRouter.patch("/:voteId", VoteController.doVote)
// VoteRouter.patch("/:voteId", VoteController.editVote)
// VoteRouter.delete("/:voteId", VoteController.deleteVote)

module.exports = VoteRouter
