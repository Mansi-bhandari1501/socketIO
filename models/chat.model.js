import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    chatRoomId: { 
      type: String, 
      unique: true,
      required: true 
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      ref: "Message"
    },
  },
  { timestamps: true }
);

const chatModel = mongoose.model("Chats", chatSchema);
export default chatModel;
