const express = require('express')
const { json } = require('body-parser')
const { controller } = require('./controller')
const app = express()
app.use(json())
controller(app)

app.listen(8080)
