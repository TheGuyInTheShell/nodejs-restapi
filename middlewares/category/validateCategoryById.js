const {Category} = require('../../models/models');
const validateById = require('../validateById')

const validateCategoryById = validateById(Category)

module.exports = validateCategoryById