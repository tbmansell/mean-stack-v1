const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use('/api/posts', require('./controllers/api/posts'))
app.use('/', require('./controllers/static'))

app.listen(3000, () => {
    console.log('Server listening on ', 3000)
})
