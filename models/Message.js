const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // senderName: {
    //   type: String,
    //   // required: true,
    // },
    text: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["seen", "not seen"],
      default: "not seen",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
