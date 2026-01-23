const express = require('express');
const { createModule,displayModuleBasedOnCourseId } = require('../controllers/module.controller');

const route = express.Router();

route.post('/create',createModule);
route.get('/display/:courseId',displayModuleBasedOnCourseId);


module.exports = route;