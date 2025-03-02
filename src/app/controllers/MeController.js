const Course = require('../models/Course')
const { multipleMongooseToObject } = require('../../util/mongoose')
class MeController {

    // [GET] /me/stored/courees
    async storedCourses(req, res, next) {
        try {
            
            res.render('me/stored-courses', {
                courses: multipleMongooseToObject(await Course.find({}))
            });
        } catch (error) {
            next()
            console.log(error)
        }
    }

    // [GET] /me/trash/courses
    async trashCourses(req, res, next) {
        try {
            // res.json(await Course.findDeleted())
            res.render('me/trash-courses', {
                courses: multipleMongooseToObject(await Course.findWithDeleted({deleted: true}))
            });
        } catch (error) {
            next()
            console.log(error)
        }
    }
}

module.exports = new MeController();
