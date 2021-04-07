const { Schema, model, Types } = require("mongoose")

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    introduce: { type: String },
    career: {
      type: [
        {
          company: { type: String },
          role: { type: String },
          _id: false,
        },
      ],
    },
    education: {
      type: [
        {
          school: { type: String },
          major: { type: String },
          _id: false,
        },
      ],
    },
    userImg: { type: String, default: "/icon.png", required: true },
    follower: { type: [{ type: Types.ObjectId, ref: "User" }] },
    following: { type: [{ type: Types.ObjectId, ref: "User" }] },
    followerCnt: { type: Number, default: 0, required: true },
    followingCnt: { type: Number, default: 0, required: true },
  },
  {
    timestamps: true,
  }
)

const User = model("User", UserSchema)
module.exports = User
