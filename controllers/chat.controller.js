import errorHandler from "../lib/utils.js";
import chatService from "../service/chat.service.js";

export const createChat = async (req, res) => {
  try {
    const response = await chatService.createChat(req.body);
    return res.status(201).json({
      success: true,
      chat: response,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

export const fetchChats = async (req, res) => {
  try {
    const results = await chatService.getChats(req.params, req.query);
    return res.status(200).json({
      success: true,
      chat: results,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

export default {
  createChat,
  fetchChats
};
