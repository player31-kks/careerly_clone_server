const { Schema, model, Types } = require("mongoose")

// 사용자 db의 형태
const UserSchema = new Schema(
  {
    // name, email, password, role, introduce, career, education: 사용자 정보
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
    // userImg: 사용자 프로필 사진
    userImg: { type: String, default: "/icon.png", required: true },
    // follower: 사용자를 팔로우하는 사용자 id
    follower: { type: [{ type: Types.ObjectId, ref: "User" }] },
    // following: 사용자가 팔로우하는 사용자 id
    following: { type: [{ type: Types.ObjectId, ref: "User" }] },
    // followerCnt, followingCnt: 각각 팔로워와 팔로잉의 수
    // 사용자가 팔로우를 할 때 본인의 팔로잉, 상대방의 팔로워 카운트를 올린다
    followerCnt: { type: Number, default: 0, required: true },
    followingCnt: { type: Number, default: 0, required: true },
  },
  {
    // createdAt, updatedAt 자동 생성
    timestamps: true,
  }
)

const User = model("User", UserSchema)
module.exports = User
