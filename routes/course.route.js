const express = require('express');
const { createCourse, removeCourse, displayCourses, updateCourse, fetchCourseAccordingToCategory } = require('../controllers/course.controllers');
const route = express.Router();

route.post('/create',createCourse);
route.delete('/remove/:courseId',removeCourse);
route.get('/display',displayCourses);
route.put('/update',updateCourse);
route.get('/category',fetchCourseAccordingToCategory);

module.exports = route;