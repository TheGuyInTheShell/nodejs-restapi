const {param} = require('express-validator')
const validateFinal = require('../validateFinal')
const validateProductById = require('./validateProductById')

const validateGetOne = [
    param('id')
    .isMongoId()
    .custom( validateProductById( {status: true} ) ),
    validateFinal
]

module.exports = validateGetOne