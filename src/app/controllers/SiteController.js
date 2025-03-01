const Course = require('../models/Course')
const { multipleMongooseToObject } = require('../../util/mongoose')
class SiteController {
    // [GET] /
    async index(req, res, next) {
        try {
            res.render('home', {
                // await trả về một courses đổi thành Object thường rồi truyền vào home với biến coursescourses
                courses: multipleMongooseToObject(await Course.find({})) 
            });
        } catch (error) {
            next(error)
            console.error(error);
        }
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
