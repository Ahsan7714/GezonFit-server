const router = require("express").Router();
const { isAuthenticatedUser } = require("../middleware/auth");
const Conversation = require("../models/Conversation");
const mongoose = require("mongoose");

// Create or get community conversation
router.post("/community", async (req, res) => {
  try {
    let conversation = await Conversation.findOne({ type: "community" });

    if (!conversation) {
      conversation = new Conversation({ type: "community", members: [] });
      await conversation.save();
    }

    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get community conversation
router.get("/community", isAuthenticatedUser, async (req, res) => {
  try {
    const conversation = await Conversation.findOne({ type: "community" }).populate({
      path: "members",
      select: "name",
    });

    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
