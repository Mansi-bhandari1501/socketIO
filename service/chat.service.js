import chatModel from "../models/chat.model.js";
import UserModel from "../models/user.model.js";

export const createChat = async (payload) => {
  const { userId, logId } = payload;

  if (!userId) {
    console.log("UserId param not sent with request");
    throw Object.assign(new Error(), {
      name: "BAD_REQUEST",
      message: "Invalid userId",
    });
  }

  const isChat = await chatModel
    .find({
      $and: [
        { users: { $elemMatch: { $eq: logId } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await UserModel.populate(isChat, {
    path: "latestMessage.sender",
    select: "username email",
  });

  if (isChat.length > 0) {
    return isChat[0];
  } else {
    var chatData = {
      chatName: "senderName",
      isGroupChat: false,
      users: [logId, userId],
    };

    try {
      const createdChat = await chatModel.create(chatData);
      console.log("ChatCreated", createdChat);
      const FullChat = await chatModel
        .findOne({ _id: createdChat._id })
        .populate("users", "firstName lasName ");
      return FullChat;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};

export const getChats = async (payload) => {
  try {
    const { logId } = payload.params;
    const results = chatModel
      .find({ users: { $elemMatch: { $eq: logId } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .sort({ updatedAt: "descending" });
    return results;
  } catch (error) {
    throw error;
  }
};

const chatService = {
  createChat,
  getChats,
};
export default chatService;
