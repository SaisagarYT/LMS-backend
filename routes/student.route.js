const express = require('express');
const {registerStudent,getAllStudents} = require('../controllers/student.controller')

const route = express.Router();

route.post('/register',registerStudent);
route.get('/details',getAllStudents);

module.exports = route;