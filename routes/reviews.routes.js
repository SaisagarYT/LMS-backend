const express = require('express');
const { postReview, removePost, displayAllReviews } = require('../controllers/reviews.controller');

const routes = express.Router();

routes.post('/:courseId/reviews',postReview);
routes.get('/:courseId/reviews',displayAllReviews);
routes.delete('/:id',removePost);

module.exports = routes;