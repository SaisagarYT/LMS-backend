const express = require('express');
const {registerStudent,getAllStudents, signInStudent, studentDetails, removeStudent, updateStudentDetails} = require('../controllers/student.controller');
const protect = require('../middleware/protectedRoute');
const upload = require('../config/upload');


const route = express.Router();

route.post('/register',registerStudent);
route.post('/signin',signInStudent)
route.get('/details',getAllStudents);
route.post('/student',studentDetails);
route.put('/update/:id', upload.single('profileImage'), updateStudentDetails);
route.delete('/remove',removeStudent);

module.exports = route;