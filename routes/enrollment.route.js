const express = require('express');
const {
    enrollCourse,
    getStudentEnrollments,
    updateProgress,
    getEnrollmentDetails,
    unenrollCourse,
} = require('../controllers/enrollment.controller');
const protect = require('../middleware/protectedRoute');

const route = express.Router();

// Protected routes (put specific routes before dynamic params)
route.post('/enroll', protect, enrollCourse);
route.get('/student/:studentId', protect, getStudentEnrollments);
route.put('/progress/:enrollmentId', protect, updateProgress);
route.delete('/unenroll', protect, unenrollCourse);

// Get enrollment details - no auth required for checking enrollment status
// This must come AFTER /student/:studentId to avoid route conflicts
route.get('/:studentId/:courseId', getEnrollmentDetails);

module.exports = route;
