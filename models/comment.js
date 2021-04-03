const { Schema, model, Types } = require("mongoose")

const CommentSchema = new Schema(
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
        comment: { type: [{ type: Types.ObjectId, ref: Comment }] },
    },
    {
        timestamps: true,
    }
)

const User = model("User", UserSchema)
module.exports = User
