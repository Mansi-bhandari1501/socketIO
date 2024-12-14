import errorHandler from "../lib/utils.js";
import messageService from "../service/message.service.js";

export const sendMessage = async (req, res) => {
  try {
    const response = await messageService.sendMessage(req.body, req.user);
    return res.status(201).json({
      success: true,
      message: response,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};

export const allMessages = async (req, res) => {
  try {
    const response = await messageService.getAllMessages(req.params,req.query);
    return res.status(200).json({
      success: true,
      response,
    });
  } catch (error) {
    errorHandler(res, error);
  }
};


export default{ allMessages, sendMessage };