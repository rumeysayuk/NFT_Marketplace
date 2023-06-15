const mongoose = require('mongoose')
const {minLengthError, requiredError} = require("../constants/messages/messages");
const PostSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now
    },
    imageUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: [true, requiredError(this)],
        minlength: [3, minLengthError(this)]
    },
    comments: [{
        text: String,
        postedBy: {
            type: mongoose.Types.ObjectId,
            ref: "Users"
        },
        likes: [
            {
                likedBy: {
                    type: mongoose.Types.ObjectId,
                    ref: "Users",
                }
            }
        ]
    }],
    postedBy: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
    }
},{ versionKey: false })

module.exports = mongoose.model("Posts", PostSchema);