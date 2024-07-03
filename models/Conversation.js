const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
  {
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    type: {
      type: String,
      enum: ["private", "community"],
      default: "private",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conversation", ConversationSchema);
