const {Schema, model} = require('mongoose')

const categorySchema = new Schema({
    name: {
        type: String,
        required: [true, 'The name is required'],
        unique: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    user_ref: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
})

categorySchema.methods.toJSON = function() {
    const {__v, _id, user_ref, ...category} = this.toObject();
    category.uid = _id;
    category.user =  {
        uid: user_ref._id,
        name: user_ref.name,
    }
    return category;
}

module.exports = model('category', categorySchema);