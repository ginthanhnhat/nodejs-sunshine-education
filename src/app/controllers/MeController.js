const Course = require('../models/Course')
const { multipleMongooseToObject } = require('../../util/mongoose')
class MeController {
    // [GET] /me/stored/coureses
    
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
}

module.exports = new MeController();
