const validateFinal = require('../validateFinal');
const validatePagination = require('../validatePagination')

const validateGetSome = [
    ...validatePagination,
    validateFinal
]

module.exports = validateGetSome;