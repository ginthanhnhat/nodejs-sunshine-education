var express = require('express');
var router = express.Router();

const courseController = require('../app/controllers/CourseController');

// courseController.index

router.get('/create', courseController.create);
router.get('/:slug', courseController.show);

router.post('/store', courseController.store)

module.exports = router;
