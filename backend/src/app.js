const express = require('express')
const cors = require('cors')

const ComidaRoutes = require('./routes/comidaRoutes')

const app = express()

app.use(cors())
app.use(express.json())
app.use(ComidaRoutes)

module.exports = app;