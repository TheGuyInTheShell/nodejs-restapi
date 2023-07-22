const {param, check} = require('express-validator')
const validateUserByIdDB = require('./validateUserByIdDB')
const validateEmailDB = require('./validateEmailDB')
const validateRoleDB = require('./validateRoleDB')
const validateFinal = require('../validateFinal')

const validatePut = [
    param('id')
    .isMongoId()
    .custom( validateUserByIdDB( {status: true} ) ),

    check('name', 'Name is required')
    .isLength({min: 3, max: 12}),

    check('email', 'Email is not valid')
    .isEmail()
    .custom(validateEmailDB(false)),

    check('password', 'Password must be at least 6 characters')
    .isLength({min: 6, max: 12}),
    
    check('role', 'Role is required')
    .custom(validateRoleDB(false)),
    
    validateFinal
]

module.exports = validatePut