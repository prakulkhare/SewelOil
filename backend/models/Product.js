const mongoose = require('mongoose');

// Product Schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    volume: { type: String, required: true },
    imageUrl: { type: String, required: true },
    features: { type: [String], required: true },
    stock: { type: Number, required: true },
    rating: { type: Number, required: true }
});

// Product Model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
