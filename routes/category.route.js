const express = require('express');
const { addNewCategory, getCategoryDetails, removeCategory } = require('../controllers/category.controller');

const route = express.Router();

route.post('/add',addNewCategory);
route.get('/details',getCategoryDetails);
route.delete('/remove',removeCategory);

module.exports = route;