const { Schema, model, Types } = require("mongoose")

const PostSchema = new Schema(
    {
        content: { type: String, required: true },
        url: { type: String },
        user: { type: Types.ObjectId, required: true, ref: "User" },
        shared: {
            type: [{ type: Types.ObjectId, required: true, ref: "User" }],
        },
        recommended: {
            type: [{ type: Types.ObjectId, required: true, ref: "User" }],
        },
        comment: {
            type: [{ type: Types.ObjectId, required: true, ref: "Comment" }],
        },
    },
    {
        timestamps: true,
    }
)

PostSchema.virtual("sharedCnt").get(function () {
    if (this.shared) return this.shared.length
    return 0
})

PostSchema.virtual("recommendedCnt").get(function () {
    if (this.recommended) return this.recommended.length
    return 0
})

PostSchema.virtual("commentCnt").get(function () {
    if (this.comment) return this.comment.length
    return 0
})

PostSchema.set("toObject", { virtuals: true })
PostSchema.set("toJSON", { virtuals: true })

const Post = model("Post", PostSchema)
module.exports = Post
