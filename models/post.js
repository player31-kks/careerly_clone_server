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
    return this.shared.length
})

PostSchema.virtual("recommendedCnt").get(function () {
    return this.recommended.length
})

PostSchema.virtual("commentCnt").get(function () {
    return this.comment.length
})

PostSchema.set("toObject", { virtuals: true })
PostSchema.set("toJSON", { virtuals: true })

const Post = model("Post", PostSchema)
module.exports = Post
