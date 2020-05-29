const express = require('express')
const router = express.Router()

router.use(express.static(__dirname + '/../../client/assets'))
router.use(express.static(__dirname + '/../../client/templates'))

router.get('/', (req, res) => {
    res.sendfile('./client/layouts/app.html')
})

module.exports = router
