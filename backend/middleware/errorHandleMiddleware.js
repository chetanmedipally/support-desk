const errorHandler = (err, req, res, next) => {
    const errorCode = res.statusCode ? res.statusCode : 500
    res.status(errorCode)
    res.json({
        message: err.message,
        stack : process.env.NODE_ENV === 'production' ? null : err.stack
    })
}
module.exports = {
    errorHandler
}