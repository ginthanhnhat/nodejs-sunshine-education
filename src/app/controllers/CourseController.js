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

    // [GET] /courses/create
    async create(req, res, next) {
        try {
            res.render('courses/create')
        } catch (error) {
            next(error)
            console.error(error);
        }
    }

    // [POST] /courses/store
    async store(req, res, next) {
        try {
            
            const course = await new Course(req.body)
            course.save()
            // res.json({message: "Add course successfull!", course})
            res.redirect('/');
        } catch (error) {
            next(error)
            console.error(error);
        }
    }
}

module.exports = new CourseController();
