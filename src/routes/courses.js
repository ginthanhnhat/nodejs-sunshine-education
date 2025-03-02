var express = require('express');
var router = express.Router();

const courseController = require('../app/controllers/CourseController');

// courseController.index

router.get('/create', courseController.create);
router.get('/:slug', courseController.show);
router.get('/:id/edit', courseController.edit);

router.post('/store', courseController.store)

router.put('/:id', courseController.update)

module.exports = router;
