const mongoose = require("mongoose");

const VoteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    select: [asda], // array??
    user: { type: Types.ObjectId, required: true, ref: "User" },
    comment: { type: [{ type: TypeError.ObjectId, ref: "Comment" }] },
    createAt: Date,
    updateAt: Date


})

const Vote = model("Vote", VoteSchema)
module.exports = Vote