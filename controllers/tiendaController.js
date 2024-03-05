const articuloTienda = require('../models/articulo')
const axios = require('axios')


const getArticulos = async (req, res) => {
    try {
        const articulos = await articuloTienda.find()
        res.status(200).json({ articulo: articulos, msg: 'Listado de articulos en Sistema' })
    } catch (error) {
        res.status(500).json({ articulo: null, msg: 'Error al obtener los articulos -' + error.message })
    }
}

const createArticulo = async (req, res) => {
    try {
        const { data } = await axios.get('https://api.bluelytics.com.ar/v2/latest')
        const precioEnEuros = Math.round(req.body.precio / data.blue_euro.value_avg)

        const nuevoArticulo = { ...req.body, precioEuros: precioEnEuros }

        await articuloTienda.create(req.body)

        res.status(201).json({ articulo: nuevoArticulo, msg: 'Articulo creado exitosamente' })
    } catch (error) {
        res.status(500).json({ articulo: null, msg: 'Error al crear el articulo -' + error.message })
    }
}

const actualizarArticulo = async (req, res) => {
    try {
        const { data } = await axios.get('https://api.bluelytics.com.ar/v2/latest')
        const precioEnEuros = Math.round(req.body.precio / data.blue_euro.value_avg)

        const articulo = await articuloTienda.findOne({ codigo: req.params.codigo })
        if (articulo) {
            const articuloActualizado = { ...req.body, precioEnEuros }
            await articuloTienda.findOneAndUpdate({ codigo: req.params.codigo }, articuloActualizado)
            res.status(201).json({ articulo: articuloActualizado, msg: 'Articulo actualizado exitosamente' })
        } else {
            res.status(404).json({ articulo: null, msg: 'Articulo inexistente' })
        }
    } catch (error) {
        res.status(500).json({ articulo: null, msg: 'Error al actualizar el articulo -' + error.message })
    }

}

const deleteArticulo = async (req, res) => {
    try {
        const articulo = await articuloTienda.findOneAndDelete({ codigo: req.params.codigo })
        res.status(201).json({ msg: 'El articulo fue eliminado exitosamente.' })
    } catch (error) {
        res.status(500).json({ articulo: null, msg: 'Error al eliminar articulo -' + error.message })
    }
}

module.exports = { getArticulos, createArticulo, actualizarArticulo, deleteArticulo }