const router = require("express").Router();
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

// Add message to community chat
router.post("/community", async (req, res) => {
  try {
    const communityConversation = await Conversation.findOne({ type: "community" });

    if (!communityConversation) {
      return res.status(404).json({ message: "Community conversation not found" });
    }
    // const sender = await User.findById(req.body.senderId);

    const newMessage = new Message({
      conversationId: communityConversation._id,
      sender: req.body.senderId,
      text: req.body.text,
      // senderName: sender.name,
    });

    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get messages from community chat
router.get("/community", async (req, res) => {
  try {
    const communityConversation = await Conversation.findOne({ type: "community" });

    if (!communityConversation) {
      return res.status(404).json({ message: "Community conversation not found" });
    }

    const messages = await Message.find({
      conversationId: communityConversation._id,
    }).sort({ createdAt: -1 }).populate('sender', 'name');

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
