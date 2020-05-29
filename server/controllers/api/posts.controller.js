const router = require('express').Router()
const Post = require('../../models/post')

router.get('/', (req, res, next) => {
    Post.find()
        .sort('-date')
        .exec((err, posts) => {
            if (err) {
                return next(err)
            }
            res.json(posts)
        })
})

router.post('/', (req, res, next) => {
    console.log('Request Auth: ', req.auth)
    const post = new Post({
        username: req.auth.username,
        body: req.body.body,
    })
    post.save((err, post) => {
        if (err) {
            return next(err)
        }
        res.status(201).json(post)
    })
})

module.exports = router
