const { Schema, model, Types } = require("mongoose")

const UserSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        role: { type: String, required: true },
        interest: { type: [String] },
        introduce: { type: String },
        career: {
            type: [{ company: { type: String }, role: { type: String } }],
        },
        education: {
            type: [{ school: { type: String }, major: { type: String } }],
        },
        userImg: { type: String },
        follower: { type: [{ type: Types.ObjectId, ref: "User" }] },
        following: { type: [{ type: Types.ObjectId, ref: "User" }] },
        phone: { type: String, required: true },
    },
    {
        timestamps: true,
    }
)

UserSchema.virtual("followerCnt").get(function () {
    return this.follower.length
})

UserSchema.virtual("followingCnt").get(function () {
    return this.following.length
})

UserSchema.set("toObject", { virtuals: true })
UserSchema.set("toJSON", { virtuals: true })

const User = model("User", UserSchema)
module.exports = User
