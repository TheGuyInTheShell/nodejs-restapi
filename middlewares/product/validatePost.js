const validateFinal = require('../validateFinal');
const validateProduct = require('./validateProduct');

const validatePost = [
   ...validateProduct,
    validateFinal
]

module.exports = validatePost;