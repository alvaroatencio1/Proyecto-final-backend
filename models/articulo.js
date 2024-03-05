const mongoose = require('mongoose')
const { Schema } = mongoose

const productoSchema = new Schema({
    codigo: {
        type: Number,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
        unique: false
    },
    talle: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    enOferta: {
        type: Boolean,
        default: true
    },
    precioEuros: {
        type: Number,
        required: false
    }
}, { timestamps: true })


const articuloTienda = mongoose.model('articuloTienda', productoSchema)

module.exports = articuloTienda