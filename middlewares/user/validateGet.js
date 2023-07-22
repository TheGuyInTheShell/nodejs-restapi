const validateFinal = require('../validateFinal');
const validatePagination = require('../validatePagination')

const validateGet = [
    ...validatePagination,
    validateFinal
]

module.exports = validateGet;