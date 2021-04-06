const { Vote } = require("../../models")
const { populate } = require("../../models/comment")

exports.creatVote = async (req, res, next) => {
    const userId = res.locals.user
    const { title, description, selection } = req.body

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
    const userSelect = ["name", "role", "userImg"]
    const vote = await Vote.find({})
        .populate([{ path: "user", select: userSelect }])
        .sort({ updateAt: -1 })
        .skip(page * 5)
        .limit(5)
    return res.send({ result: vote })
}

exports.getVoteDetail = async (req, res, next) => {
    const { voteId } = req.params
    try {
        const userSelect = ["name", "role", "userImg"]
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