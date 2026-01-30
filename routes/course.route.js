const express = require('express');
const { createCourse, removeCourse, displayCourses, updateCourse, fetchCourseAccordingToCategory, getCourseById } = require('../controllers/course.controllers');
const route = express.Router();

route.post('/create',createCourse);
route.get('/display',displayCourses);
route.get('/category',fetchCourseAccordingToCategory);
route.get('/:id',getCourseById);
route.put('/update',updateCourse);
route.delete('/remove/:courseId',removeCourse);

module.exports = route;