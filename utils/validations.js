const { check } = require('express-validator')
const articuloVerify = require('../models/articulo')

const codigo = check('codigo')
    .notEmpty().withMessage("El codigo es obligatorio")
    .isLength({ max: 15 }).withMessage('El codigo tener un maximo de 15 caracteres')
    .isNumeric().withMessage('El codigo debe ser numerico.')

const nombre = check('nombre')
    .notEmpty().withMessage("El nombre es obligatorio")
    .isLength({ min: 5, max: 50 }).withMessage('El nombre debe tener un entre 5-50 caracteres')


const stock = check('stock')
    .notEmpty().withMessage("El stock es obligatorio")
    .isLength({ max: 5 }).withMessage('El stock tener un maximo de 5 caracteres')
    .isNumeric().withMessage('El stock debe ser numerico.')

const precio = check('precio')
    .notEmpty().withMessage("El precio es obligatorio")
    .isLength({ max: 10 }).withMessage('El stock tener un maximo de 10 caracteres')
    .isNumeric().withMessage('El precio debe ser numerico.')


const codigoVerify = check('codigo')
    .custom(async (value) => {
        const articulo = await articuloVerify.findOne({ codigo: value });

        if (!articulo) {
            throw new Error('Código no encontrado en la base de datos');
        }
        return true;
    });

module.exports = { codigo, nombre, codigoVerify, stock, precio }