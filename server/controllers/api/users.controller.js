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

router.post('/', async (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    if (password.trim().length < 3) {
        return res.status(400).send('Invalid password')
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).send('User already exists')
    }

    const user = new User({ username })

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
            const token = jwt.encode({ username: user.username }, config.secret)
            res.status(201).send(token)
        })
    })
})

module.exports = router
