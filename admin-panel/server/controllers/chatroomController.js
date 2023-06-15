const asyncErrorWrapper = require("express-async-handler");
const Chatroom = require("../models/Chatroom");
const Message = require("../models/Message");
const Messages = require("../models/Messages");
const CustomError = require("../helpers/error/CustomError");
const mongoose = require("mongoose");

const createChatroom = asyncErrorWrapper(async (req, res) => {
    const {chatroomName} = req.body;
    const oldRoom = await Chatroom.findOne({name: chatroomName});
    if (oldRoom) return res.status(400).json({message: "Chatroom name already exists"});
    const chatroom = await Chatroom.create({name: chatroomName,creator: req.user._id});
    return res.status(200).json({message: "Chatroom created successfully", chatroom});
})

const getAllChatrooms = asyncErrorWrapper(async (req, res) => {
    const chatrooms = await Chatroom.find({});
    return res.status(200).json({
        message: "Chatrooms fetched successfully",
        data: chatrooms
    });
})

const getMessagesByChatroom = asyncErrorWrapper(async (req, res) => {
    const {id} = req.params;
    const chatroom = await Chatroom.findById(id);
    if (!chatroom) return res.status(400).json({message: "Chatroom room not found"});
    const messages = await Message.find({chatroom: id});
    return res.status(200).json({
        message: "Messages fetched successfully",
        data: messages
    });
})

const deleteChatroom = asyncErrorWrapper(async (req, res, next) => {
    let { id} = req.params
    const user = req.user

    if (!id || !mongoose.Types.ObjectId.isValid(id)) return next(new CustomError("Wrong id !", 400))
    const oldRoom = await Chatroom.findOne({_id: id});

    if (user._id ==! oldRoom._id) return next(new CustomError("You are not authorized to delete this chatroom", 401))
    await Chatroom.deleteOne({_id: id})
    return res.status(200).json({message:"Chatroom deleted ..!", success: true})
})

const getMessages = async (req, res, next) => {
    try {
        const { from, to } = req.body;

        const messages = await Messages.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1 });

        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            };
        });
        res.json(projectedMessages);
    } catch (ex) {
        next(ex);
    }
};

const addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const data = await Messages.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        });

        if (data) return res.json({ msg: "Message added successfully." });
        else return res.json({ msg: "Failed to add message to the database" });
    } catch (ex) {
        next(ex);
    }
};



module.exports = {createChatroom, getAllChatrooms, getMessagesByChatroom,deleteChatroom,addMessage,getMessages};