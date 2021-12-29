const express = require("express");
const chatController = require("../modules/chatModule");

const chatrouter = express.Router();


// URL: <app>/chat
router.get('/chat', chatController.index)

// Demo to show off the real-time nature of TalkJS a basic group chat example
// URL: <app>/chat/dual
router.get("/dual", chatController.dual);


module.exports = chatrouter;