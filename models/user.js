const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is required']
    },
    email: {
        type: String,
        required: [true, 'The email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'The password is required']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: [true, 'The role is required'],
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'SELLER_ROLE'],
    },
    status: {
        type: Boolean,
        default: true  
    },
    google: {
        type: Boolean,
        default: false
    }
})


userSchema.methods.toJSON = function() {
    const {__v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model('user', userSchema);