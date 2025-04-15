import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../services/api";  // Assuming fetchProducts works correctly.

const ProductDetail = () => {
    const { id } = useParams();  // id comes from the URL parameter
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Fetch products from the API
        fetchProducts().then((data) => {
            // Find the product by comparing with the _id from the API
            const selectedProduct = data.find((p) => p._id === id);
            setProduct(selectedProduct);
        });
    }, [id]);

    if (!product) return <p className="text-center mt-6">Loading...</p>;

    return (
        <div className="p-8">
            {/* Product Title */}
            <h1 className="text-3xl font-bold text-center">{product.name}</h1>
            {/* Product Image */}
            <img
                src={product.imageUrl || "https://via.placeholder.com/300"}
                alt={product.name}
                className="mx-auto my-4 w-80"
            />
            {/* Product Details */}
            <p className="text-gray-600 text-center">Price: ${product.price}</p>
            <p className="text-gray-600 text-center">Category: {product.category}</p>
            <p className="text-gray-600 text-center">Volume: {product.volume}</p>
            <p className="text-gray-600 text-center">Stock: {product.stock}</p>
            <p className="text-gray-600 text-center">Rating: {product.rating} ⭐</p>
            <div className="text-center my-4">
                <h3 className="font-semibold">Features:</h3>
                <ul className="list-disc list-inside">
                    {product.features.map((feature, index) => (
                        <li key={index} className="text-gray-600">{feature}</li>
                    ))}
                </ul>
            </div>
            <p className="text-center mt-4">{product.description}</p>
        </div>
    );
};

export default ProductDetail;
