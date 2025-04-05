const Product = require('../models/Product');

// Controller to get all products
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();  // Fetch all products from the database
        res.status(200).json(products);  // Send the products as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching products" });
    }
};

// Controller to get a single product by ID
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching product" });
    }
};

module.exports = {
    getAllProducts,
    getProductById
};
