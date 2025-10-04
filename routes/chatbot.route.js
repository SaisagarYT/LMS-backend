const express = require('express');
const { messageChatbot, getMessageById, getConversationMessages } = require('../controllers/chatbot.controller');

const route = express.Router();

route.post('/message/:id',messageChatbot);
route.get('/chat/:id',getMessageById);
route.post('/conversation/:id',getConversationMessages);

module.exports = route;