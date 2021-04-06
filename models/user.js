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
    userImg: { type: String },
    follower: { type: [{ type: Types.ObjectId, ref: "User" }] },
    following: { type: [{ type: Types.ObjectId, ref: "User" }] },
  },
  {
    timestamps: true,
  }
)

UserSchema.virtual("followerCnt").get(function () {
  if (this.follower) return this.follower.length
  else return 0
})

UserSchema.virtual("followingCnt").get(function () {
  if (this.following) return this.following.length
  else return 0
})

UserSchema.set("toObject", { virtuals: true })
UserSchema.set("toJSON", { virtuals: true })

const User = model("User", UserSchema)
module.exports = User
