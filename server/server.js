const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const ws = require('./websockets')

const app = express()
app.use(cors());
app.use(bodyParser.json())
app.use(require('./auth'))
app.use('/api/posts', require('./controllers/api/posts.controller'))
app.use('/api/users', require('./controllers/api/users.controller'))
app.use('/api/sessions', require('./controllers/api/sessions.conttroller'))
app.use('/', require('./controllers/static.controller'))

const server = app.listen(3000, () => {
    console.log('Server listening on ', 3000)
})
ws.connect(server)
