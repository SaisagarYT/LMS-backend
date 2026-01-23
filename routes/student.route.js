const express = require('express');
const {registerStudent,getAllStudents, signInStudent, studentDetails, removeStudent, updateStudentDetails} = require('../controllers/student.controller');
const protect = require('../middleware/protectedRoute');


const route = express.Router();

route.post('/register',registerStudent);
route.post('/signin',signInStudent)
route.get('/details',getAllStudents);
route.post('/student',studentDetails);
route.put('/update/:id',updateStudentDetails);
route.delete('/remove',removeStudent);

module.exports = route;