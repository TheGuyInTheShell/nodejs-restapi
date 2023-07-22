const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "The name is required"],
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  user_ref: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  category_ref: {
    type: Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  description: {
    type: String,
  },
  available: {
    type: Boolean,
    default: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  img: {
    type: String,
  }
});

productSchema.methods.toJSON = function () {
  const { __v, _id, ...product } = this.toObject();
  product.uid = _id;
  return product;
};

module.exports = model("product", productSchema);