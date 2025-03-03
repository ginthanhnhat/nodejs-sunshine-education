const Course = require('../models/Course')
const { multipleMongooseToObject } = require('../../util/mongoose')
class MeController {

    // [GET] /me/stored/courees
    async storedCourses(req, res, next) {
        try {

            res.render('me/stored-courses', {
                countDeleted: await Course.countDocumentsWithDeleted({deleted: true}),
                courses: multipleMongooseToObject(await Course.find({}).sortable(req))
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
                courses: multipleMongooseToObject(await Course.findWithDeleted({deleted: true}).sortable(req))
            });
        } catch (error) {
            next()
            console.log(error)
        }
    }
}

module.exports = new MeController();
