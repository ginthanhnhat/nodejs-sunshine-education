const Course = require('../models/Course')
const { mongooseToObject } = require('../../util/mongoose')

class CourseController {
    
    // [GET] /courses/:slugs
    async show(req, res, next) {
        try {
            res.render('courses/show', {
                course: mongooseToObject(await Course.findOne({slug: req.params.slug}))
            });
        } catch (error) {
            next(error)
            console.error(error);
        }
    }
}

module.exports = new CourseController();
