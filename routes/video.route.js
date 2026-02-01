const express = require('express');
const { createVideo, getVideoBasedOnModule, getVideoById } = require('../controllers/video.controller');
const route = express.Router();

route.post('/create',createVideo);
route.get('/display/module/:moduleId',getVideoBasedOnModule);
route.post('/display',getVideoBasedOnModule);
route.get('/display/:videoId',getVideoById);

module.exports = route;