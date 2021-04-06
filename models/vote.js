const { Schema, model, Types } = require("mongoose")

const VoteSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        selection: { type: [String] },
        user: { type: String, required: true, ref: "User" },
        result: {
            type: [
                {
                    user: { type: Types.ObjectId, ref: "User", required: true },
                    select: { type: Number },
                },
            ],
        },
        comment: { type: [{ type: Types.ObjectId, ref: "Comment" }] },
    },
    {
        timestamps: true,
    }
)

VoteSchema.virtual("commentCnt").get(function () {
    if (this.comment) return this.comment.length
    return 0
})


PostSchema.set("toObject", { virtuals: true })
PostSchema.set("toJSON", { virtuals: true })


const Vote = model("Vote", VoteSchema)
module.exports = Vote
