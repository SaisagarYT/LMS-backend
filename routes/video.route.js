const express = require('express');
const { createVideo, getVideoBasedOnModule } = require('../controllers/video.controller');
const route = express.Router();

route.post('/create',createVideo);
route.post('/display',getVideoBasedOnModule);

module.exports = route;