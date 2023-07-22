const {User} = require('../../models/models');
const validateById = require('../validateById')

const validateUserByIdDB = validateById(User)

module.exports = validateUserByIdDB