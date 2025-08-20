const express = require('express');
const { createModule } = require('../controllers/module.controller');

const route = express.Router();

route.post('/create',createModule);

module.exports = route;