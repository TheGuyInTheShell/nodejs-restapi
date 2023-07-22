const {param} = require('express-validator')
const validateUserByIdDB = require('./validateUserByIdDB')
const validateFinal = require('../validateFinal')

const validateDelete = [
    param('id')
    .isMongoId()
    .custom( validateUserByIdDB({status: true}) ),
    
    validateFinal
]

module.exports = validateDelete