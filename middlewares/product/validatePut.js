const {param} = require('express-validator')
const validateProductById = require('./validateProductById')
const validateFinal = require('../validateFinal')
const validateProduct = require('./validateProduct')

const validatePut = [
    ...validateProduct,
    param('id')
    .isMongoId()
    .custom( validateProductById( {status: true} ) ),
    validateFinal,
]

module.exports = validatePut