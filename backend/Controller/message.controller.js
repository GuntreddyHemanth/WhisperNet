const Conversation = require("../modles/conversation.model");
const Message = require("../modles/messages.model");


module.exports.sendMessage = async (req, res) => {
    try {
        const {message} = req.body
        const {id: receiverId} = req.params
        const senderId = req.user._id

        let conversation = await Conversation.findOne({
            participants: {$all : [senderId, receiverId]},
        });

        if (!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage  = new Message({
            senderId,
            receiverId,
            message,
        })

        if (newMessage){
            conversation.messages.push(newMessage._id)
        }

        // this will takes more time to compute the result
        // await newMessage.save()
        // await conversation.save()

        await Promise.all([conversation.save(), newMessage.save()]); // this will run paralle with out any delay basical these two start at same time 

        res.status(201).json({
            newMessage
        })

    } catch (error) {
        console.log("error in sendingMessage controller: ", error.message)
        res.status(500).json({
            error: "Internal server error"
        })
    }
}

module.exports.getMessages = async (req, res) => {
    try {
        const {id: userTochatId} = req.params
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participants:{ $all: [senderId, userTochatId]}
        }).populate("messages")

        console.log(conversation)

        if (!conversation) return res.status(200).json([])

        const messages = conversation.messages
        console.log(messages)

        res.status(200).json(messages)
        
    } catch (error) {
        console.log("error in getingMessage controller: ", error.message)
        res.status(500).json({
            error: "Internal server error"
        })
    }
}