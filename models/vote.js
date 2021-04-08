const { Schema, model, Types } = require("mongoose")

// 투표글 db의 형태
const VoteSchema = new Schema(
    {
        // title, description: 투표의 제목과 설명
        title: { type: String, required: true },
        description: { type: String, required: true },
        // selection: 투표의 선택지들이 string의 리스트로 저장됨
        selection: { type: [String] },
        // user: 투표를 만든 사용자
        user: { type: String, required: true, ref: "User" },
        // result: 투표의 결과 / 투표 참가자의 id와 각각이 몇번째 선택지를 골랐는지 저장됨
        // 예: [{ "user": "0z123c1", "select": "3" }]
        result: {
            type: [
                {
                    user: { type: Types.ObjectId, ref: "User", required: true },
                    select: { type: Number },
                },
            ],
        },
        // 투표에 달린 댓글들의 id
        comment: { type: [{ type: Types.ObjectId, ref: "Comment" }] },
    },
    {
        // createdAt, updatedAt 자동 생성
        timestamps: true,
    }
)

VoteSchema.virtual("commentCnt").get(function () {
    if (this.comment) return this.comment.length
    return 0
})


VoteSchema.set("toObject", { virtuals: true })
VoteSchema.set("toJSON", { virtuals: true })


const Vote = model("Vote", VoteSchema)
module.exports = Vote
