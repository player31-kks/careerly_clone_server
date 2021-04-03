const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
    title: String,
    description: String,
    select: [asda], // array
    user: mongoose.ObjectId,
    comment: [],
    createAt: Date,
    updateAt: Date


})