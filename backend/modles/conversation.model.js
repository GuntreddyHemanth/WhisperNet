const mongoose = require("mongoose")


const conversionSchema = new mongoose.Schema({
    participants:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    message: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: [],
        },
    ],
}, {timestamps: true})

const Conversation = mongoose.model("Conversation", conversionSchema)

module.exports = Conversation

