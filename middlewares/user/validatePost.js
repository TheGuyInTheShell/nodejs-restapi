const { check } = require('express-validator');
const validateRoleDB = require('./validateRoleDB');
const validateFinal = require('../validateFinal');
const validateEmailDB = require('./validateEmailDB');

const validateUser = [
    check('name', 'Name is required')
    .isLength({min: 3, max: 12}),
    check('email', 'Email is not valid')
    .isEmail()
    .custom(validateEmailDB()),
    check('password', 'Password must be at least 6 characters')
    .isLength({min: 6, max: 12}),
    check('role', 'Role is required')
    .custom(validateRoleDB()),
    validateFinal
]

module.exports = validateUser;