const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema({
    name: {
        type: String,
        match: /^[A-Za-z\s+$]/,
        required: "Name is required!",
    },
    createdAt: {
         type: Date,
         default: Date.now,
    },
    creator: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
    }
}, { versionKey: false });

module.exports = mongoose.model("Chatrooms", chatroomSchema);