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
    console.log('Post: ', req.body.username, ':', req.body.body)
    const post = new Post({
        username: req.body.username,
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
