import { deleteMessage, sendMessage } from "../service/message.service.js";


export const handleSocketEvents = (socket, io) => {
    socket.on("join-room", (chatId) => {
        console.log(chatId)
        console.log(`User joined room ${socket.id}`);
    });
    
    socket.on("message", ({ chatRoomId, content, senderId }) => {
        const payload = { chatRoomId, content, senderId }
        sendMessage(io,payload);
    });

    socket.on("disconnect", () => {
        console.log("User Dissconnected");
    });
}