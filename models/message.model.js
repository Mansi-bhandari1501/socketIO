import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    content: {
      type: String,
      trim: true,
    },
    chatRoomId: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const messageModel = mongoose.model("Messages", messageSchema);
export default messageModel;
