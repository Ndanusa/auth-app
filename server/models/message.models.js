import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
   sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
   },
   message: {
      type: String,
   },
   chatId: {
      type: String,
      default: null,
   },
   receiver: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      required: true,
   },
   createdAt: {
      type: Date,
      default: Date.now(),
   },
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
