const express = require('express')
const app = express()

const connect = require('./database/dbConnection')

const tiendaRouter = require('./routes/tienda')

app.use(express.json()) //middleware para manejo de datos en JSON

app.use('/test', (req, res) => {
    res.send("Proyecto Final Backend")
})

app.use('/tienda', tiendaRouter)

connect()

module.exports = app

