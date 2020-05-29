const jwt = require('jwt-simple')
const config = require('./config')

module.exports = (req, res, next) => {
    console.log('Auth decode: ', req.headers['x-auth'])
    if (req.headers['x-auth']) {
        req.auth = jwt.decode(req.headers['x-auth'], config.secret)
        console.log('***** Auth added to request: ', req.auth)
    }
    else console.log('**** NO AUTH HEADER')
    next()
}
