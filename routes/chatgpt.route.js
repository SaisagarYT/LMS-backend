const express = require('express');
const {chatDetails,chatHistory} = require('../controllers/chatgpt.controller');

const route = express.Router();

route.post('/chat/details',chatDetails);
route.get('/chat/history',chatHistory);

module.exports = route;