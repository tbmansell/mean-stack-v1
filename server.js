const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(require('./auth'))
app.use('/api/posts', require('./controllers/api/posts'))
app.use('/api/users', require('./controllers/api/users'))
app.use('/api/sessions', require('./controllers/api/sessions'))
app.use(require('./controllers/static'))

app.listen(3000, () => {
    console.log('Server listening on ', 3000)
})
