import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
   sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
   },
   reciever: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
   },
   content: String,
   createdAt: {
      type: Date,
      default: Date.now(),
   },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
