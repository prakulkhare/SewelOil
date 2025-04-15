import React, { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Hardcoded product data
  const productData = [
    {
      _id: "1",
      name: "Premium Engine Oil",
      price: 29.99,
      description: "High-performance engine oil for extended engine life.",
      imageUrl: "https://via.placeholder.com/300x200?text=Engine+Oil"
    },
    {
      _id: "2",
      name: "Hydraulic Oil",
      price: 45.50,
      description: "Ideal for hydraulic systems needing anti-wear protection.",
      imageUrl: "https://via.placeholder.com/300x200?text=Hydraulic+Oil"
    },
    {
      _id: "3",
      name: "Gear Oil",
      price: 39.95,
      description: "Synthetic gear oil for smooth transmission performance.",
      imageUrl: "https://via.placeholder.com/300x200?text=Gear+Oil"
    },
    {
      _id: "4",
      name: "Coolant Fluid",
      price: 19.99,
      description: "High-quality coolant for engine temperature regulation.",
      imageUrl: "https://via.placeholder.com/300x200?text=Coolant"
    },
    {
      _id: "5",
      name: "Brake Fluid",
      price: 14.25,
      description: "DOT-approved brake fluid for all types of vehicles.",
      imageUrl: "https://via.placeholder.com/300x200?text=Brake+Fluid"
    },
    {
      _id: "6",
      name: "Industrial Lubricant",
      price: 59.90,
      description: "Heavy-duty lubricant for industrial machinery.",
      imageUrl: "https://via.placeholder.com/300x200?text=Industrial+Lubricant"
    }
  ];

  useEffect(() => {
    // Set product data
    setProducts(productData);
    setFilteredProducts(productData);
  }, []);

  // Handle search
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Search */}
      <div className="p-6 flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 w-1/2 border rounded-lg"
        />
      </div>

      {/* Product Grid */}
      <section className="p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product._id} className="bg-white p-4 shadow-lg rounded-lg">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="text-xl font-semibold mt-2">{product.name}</h3>
                <p className="text-gray-600 mt-1">${product.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 w-full">
                  View Details
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No products found</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
