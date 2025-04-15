const express = require('express');
const { getAllProducts, getProductById } = require('../controllers/productController');

const router = express.Router();

// Route to get all products
router.get('/products', getAllProducts);

// Route to get a single product by ID
router.get('/products/:id', getProductById);

module.exports = router;
