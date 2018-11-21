let express = require('express')
let app = express()

let post = require('./models/posts')

app.get('/', function (req, res) {
    res.status(400).json({ mjs: "Bienvenidos SQLite" })
})

app.get('/posts', function (req, res) {
    res.status(400).json({ mjs: "Bienvenidos SQLite" })
})

app.listen(1234, function() {
    post.getPosts()
    console.log('Connect with sqlite is running')
})