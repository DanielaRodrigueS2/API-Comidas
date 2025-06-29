const express = require('express')
const cors = require('cors')

const comidaRoutes = require('./routes/comidaRoutes')

const app = express()

app.use(cors())
app.use(express.json())
app.use(comidaRoutes)

module.exports = app;