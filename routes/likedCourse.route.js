const express = require('express');
const {addLikedCourses,showLikedCoure, collectLikedCourse, removeLikedCourse} = require('../controllers/likedCourse.controller');

const route = express.Router();

route.post('/add',addLikedCourses);
route.get('/details',showLikedCoure);
route.post('/collect',collectLikedCourse);
route.delete('/remove',removeLikedCourse);
module.exports = route;