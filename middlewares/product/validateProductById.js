const { Product } = require('../../models/models');
const validateById = require('../validateById')

const validateProductById = validateById(Product)

module.exports = validateProductById