const { Vote } = require("../../models")
const userSelect = ["name", "role", "userImg"]

/**
 * Vote 대한 CRU
 * 로그인 한 후의 기능이기 때문에 vaildation을 거쳐야함
 *
 */

exports.creatVote = async (req, res, next) => {
  const userId = res.locals.user
  const { title, description } = req.body

  if (typeof title !== "string")
    return res.status(400).send({ err: "제목이 형식에 맞지 않습니다." })
  if (typeof description !== "string")
    return res.status(400).send({ err: "내용이 형식에 맞지 않습니다." })

  const vote = new Vote({ ...req.body, user: userId })
  try {
    await vote.save()
    return res.send({ success: true })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ err: err.meassage })
  }
}

exports.getVote = async (req, res, next) => {
  try {
    const vote = await Vote.find({})
      .populate([{ path: "user", select: userSelect }])
      .sort({ updateAt: -1 })
      .limit(17)
    return res.send({ result: vote })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ err: err.meassage })
  }
}

exports.getVoteDetail = async (req, res, next) => {
  const { voteId } = req.params
  try {
    const vote = await Vote.findById(voteId).populate([
      { path: "user", select: userSelect },
      { path: "comment", populate: { path: "user", select: userSelect } },
    ])
    return res.send({ result: vote })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ err: err.meassage })
  }
}

exports.doVote = async (req, res, next) => {
  const { voteId } = req.params
  const userId = res.locals.user
  const { select } = req.body
  try {
    await Vote.updateOne(
      { _id: voteId },
      {
        $push: { result: { user: userId, select } },
      }
    )
    return res.send({ success: true })
  } catch (err) {
    console.log(err)
    return res.status(400).send({ err: err.meassage })
  }
}
