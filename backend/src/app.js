const express = require('express')
const cors = require('cors')
const compression = require('compression')
const rateLimiter = require('./config/rateLimiter')

const comidaRoutes = require('./routes/comidaRoutes')
const loginRoutes = require('./routes/loginRoutes')

const app = express()

app.use(cors())
app.use(compression())
app.use(express.json())
app.use(rateLimiter)
app.use(comidaRoutes)
app.use(loginRoutes)

module.exports = app;