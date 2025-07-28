const express = require('express');
const { createCourse, removeCourse, displayCourses } = require('../controllers/course.controllers');
const route = express.Router();

route.post('/create',createCourse);
route.delete('/remove',removeCourse);
route.get('/display',displayCourses);

module.exports = route;