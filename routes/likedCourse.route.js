const express = require('express');
const {addLikedCourses,showLikedCourse, collectLikedCourse, removeLikedCourse, checkIfLiked} = require('../controllers/likedCourse.controller');

const route = express.Router();

route.post('/add',addLikedCourses);
route.get('/details',showLikedCourse);
route.get('/check',checkIfLiked);
route.post('/collect',collectLikedCourse);
route.delete('/remove',removeLikedCourse);
module.exports = route;