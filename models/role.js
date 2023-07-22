const {Schema, model} = require('mongoose')

const roleSchema = new Schema({
    role: {
        type: String,
        required: [true, 'The role is required']
    }
})


module.exports = model('role', roleSchema);