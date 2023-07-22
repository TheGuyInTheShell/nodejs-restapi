const { check } = require('express-validator');
const validateFinal = require('../validateFinal');
const validateEmailDB = require('../user/validateEmailDB');

const validateAuth = [

    check('email', 'Email is not valid')
    .isEmail()
    .custom(validateEmailDB(false)),
    
    check('password', 'Password is required')
    .notEmpty(),

    validateFinal
]

module.exports = validateAuth;