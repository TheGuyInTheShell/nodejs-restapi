const {query} = require('express-validator');

const validatePagination = [
    query('limit')
        .optional()
        .isInt({min: 1, max: 100})
        .withMessage('Limit must be between 1 and 100'),
    query('pag')
        .optional()
        .isInt({min: 1})
        .withMessage('Page must be greater than 0'),
]

module.exports = validatePagination