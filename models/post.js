const { Schema, model, Types } = require("mongoose")

const PostSchema = new Schema(
    {
        content: { type: String, required: true },
        url: { type: String, required: true },
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

const Post = model("Post", PostSchema)
module.exports = Post
