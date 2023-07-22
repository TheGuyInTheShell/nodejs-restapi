const {check, param} = require('express-validator')
const validateCategoryById = require('./validateCategoryById')
const validateFinal = require('../validateFinal')

const validatePut = [
    check('name', 'Name is require')
    .notEmpty(),
    param('id')
    .isMongoId()
    .custom( validateCategoryById( {status: true} ) ),
    validateFinal
]

module.exports = validatePut