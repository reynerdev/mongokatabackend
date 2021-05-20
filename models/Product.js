const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
    lowercase: true,
  },
  product_price: {
    type: Number,
    required: true,
  },
  product_quantity: {
    type: Number,
    required: true,
  },
  is_active: {
    type: Boolean,
    default: true,
  },
});

// We create the model Product which will allow us to
// intereact with colecction Producs

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
