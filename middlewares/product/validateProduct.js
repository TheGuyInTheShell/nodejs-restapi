const {check} = require('express-validator');
const {validateCategoryById} = require('../category/index');

const validateProduct = [
    check('name', 'The name is required').notEmpty(),
    check('price', 'The price need be a number')
    .default(0)
    .isNumeric({min: 0}),
    check('category_ref', 'The category is required')
    .isMongoId()
    .notEmpty()
    .custom(validateCategoryById({status: true})),
    check('description', 'The description')
    .default('')
    .isString(),
    check('stock', 'The stock is required')
    .default(0)
    .isNumeric({min: 0}),
    check('img', 'The img is required')
    .default('')
    .isString(),
]


module.exports = validateProduct;