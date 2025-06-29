const express = require('express')
const cors = require('cors')
const compression = require('compression')

const comidaRoutes = require('./routes/comidaRoutes')

const app = express()

app.use(cors())
app.use(compression())
app.use(express.json())
app.use(comidaRoutes)

module.exports = app;