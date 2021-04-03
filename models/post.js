const { Schema, model, Types } = require("mongoose")

const PostSchema = new Schema(
    {
        content: { type: String, required: true },
        url: { type: String, required: true },
        user: { type: Types.ObjectId, required: true, ref: "User" },
        shared: {
            type: [{ type: Type.ObjectId, required: true, ref: "User" }],
        },
        recommended: {
            type: [{ type: Type.ObjectId, required: true, ref: "User" }],
        },
        comment: {
            type: [{ type: Type.ObjectId, required: true, ref: "Comment" }],
        },
    },
    {
        timestamps: true,
    }
)

const Post = model("Post", PostSchema)
module.exports = Post
