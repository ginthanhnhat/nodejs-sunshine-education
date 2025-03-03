module.exports = function sortMiddleware(req, res, next) {

    res.locals._sort = {
        enable: false,
        type: 'default',
    }

    if (Object.prototype.hasOwnProperty.call(req.query, '_sort')) {
        res.locals._sort.enable = true
        res.locals._sort.column = req.query.column
        res.locals._sort.type = req.query.type
    }

    next()
}