const express = require('express');
const {registerStudent,getAllStudents, signInStudent} = require('../controllers/student.controller');
const protect = require('../middleware/protectedRoute');


const route = express.Router();

route.post('/register',registerStudent);
route.post('/signin',signInStudent)
route.get('/details',getAllStudents);

module.exports = route;