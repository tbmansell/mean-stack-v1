const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jwt-simple')
const config = require('../../config')
const User = require('../../models/user')

router.get('/', (req, res, next) => {
    if (!req.headers['x-auth']) {
        return res.send(401)
    }

    const auth = jwt.decode(req.headers['x-auth'], config.secret)

    User.findOne({ username: auth.username }, (err, user) => {
        if (err) {
            return next(err)
        }
        res.json(user)
    })
})

router.post('/', (req, res, next) => {
    const user = new User({ username: req.body.username })

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return next(err)
        }
        user.password = hash
        user.save((err) => {
            if (err) {
                return next(err)
            }
            console.log('Created User: ', user.username, ' password: ', req.body.password)
            res.status(201).send(user)
        })
    })
})

module.exports = router
