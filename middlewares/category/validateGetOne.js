const {param} = require('express-validator')
const validateFinal = require('../validateFinal')
const validateCategoryById = require('./validateCategoryById')

const validateGetOne = [
    param('id')
    .isMongoId()
    .custom( validateCategoryById( {status: true} ) ),
    validateFinal
]

module.exports = validateGetOne