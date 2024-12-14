
import chatModel from '../models/chat.model.js';
import { io } from '../server.js';
import messageModel from './../models/message.model.js';

export const getAllMessages = async (params,query) => {
    try {
        const { chatRoomId } = params;
        const {senderId, recieverId} = query
        const chatRoomExists = await chatModel.findOne({chatRoomId});
        if(!chatRoomExists){
            await chatModel.create(
                {
                    chatRoomId: chatRoomId, 
                    users: [ senderId, recieverId]
                }
            )
        }
        const messages = await messageModel.find({chatRoomId})
            .populate("sender")
        const chat = await chatModel.findOne({chatRoomId})
        return {messages, chat}
    } catch (error) {
        console.log(error)
        throw new error;
    }
};

export const sendMessage = async (payload, user) => {
    const { content, chatRoomId } = payload;
    const chatRoomExists = await chatModel.findOne({chatRoomId});
    try {
        const messsage = {
            sender: user._id,
            content: content,
            chatRoomId: chatRoomExists.chatRoomId
        };
        const response = await messageModel.create(messsage);
        const message = await messageModel.findById(response._id).populate("sender")
        io.emit(response.chatRoomId, message)
        // socket.emit(response.chatRoomId, response);
        // socket.to(response.chatRoomId, response);
        await chatModel.findOneAndUpdate({chatRoomId: response.chatRoomId}, { latestMessage: response._id });
        return response;
    } catch (error) {
        console.log(error)
    }
}

export const deleteMessage = async (socket, io, payload) => {
    const { messageId, chatRoomId } = payload;
    const chatRoomExists = await chatModel.findOne({chatRoomId});
    if(!chatRoomExists){
        throw new Error('Chat Room not defined')
    }
    await messageModel.findByIdAndDelete({messageId});
    const messages = await messageModel.find({chatRoomId}).populate("sender").populate("chatRoomId");
    io.emit(response.chatRoomId, messages)
    return messages;
}

const messageService = {
    getAllMessages,
    sendMessage
}

export default messageService;