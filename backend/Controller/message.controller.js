const Conversation = require("../modles/conversation.model");
const Message = require("../modles/messages.model");
const { getReceiverSocketId, io} = require("../sockets/socket");


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

        // const sendMessage = (newMessage, receiverId) => {
        //     const receiverSocketId = getReceiverSocketId(receiverId);
        //     if (receiverSocketId) {
        //         io.to(receiverSocketId).emit("newMessage", newMessage);
        //     } else {
        //         console.log("Receiver is not online");
        //     }
        // };
        
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        res.status(201).json(newMessage)

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

        if (!conversation) return res.status(200).json([])

        const messages = conversation.messages
        res.status(200).json(messages)
        
    } catch (error) {
        console.log("error in getingMessage controller: ", error.message)
        res.status(500).json({
            error: "Internal server error"
        })
    }
}