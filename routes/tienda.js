const express = require('express')
const router = express.Router()

const tiendaController = require('../controllers/tiendaController')
const { codigo, nombre, codigoVerify, precio, stock } = require('../utils/validations')
const validate = require('../middlewares/validate')
const logRequest = require('../middlewares/logRequest')

//--------------------------Routes--------------------------------------
router.get('/', logRequest, tiendaController.getArticulos) //obtener articulos cargados en tienda
router.post('/', [codigo, nombre, precio, stock], logRequest, validate, tiendaController.createArticulo) //crear articulo nuevo
router.put('/:codigo', [codigo, codigoVerify], logRequest, validate, tiendaController.actualizarArticulo) //actualizar informacion de articulo en tienda
router.delete('/:codigo', [codigoVerify], logRequest, validate, tiendaController.deleteArticulo) //eliminar articulo de tienda


module.exports = router