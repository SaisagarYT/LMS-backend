const express = require('express');
const {registerStudent,getAllStudents, signInStudent, studentDetails, removeStudent} = require('../controllers/student.controller');
const protect = require('../middleware/protectedRoute');


const route = express.Router();

route.post('/register',registerStudent);
route.post('/signin',signInStudent)
route.get('/details',getAllStudents);
route.post('/student',studentDetails);
route.delete('/remove',removeStudent);

module.exports = route;