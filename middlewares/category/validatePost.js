const { check } = require('express-validator');
const validateFinal = require('../validateFinal');

const validatePost = [
    check('name', 'Name is required')
    .notEmpty(),
    validateFinal
]

module.exports = validatePost;