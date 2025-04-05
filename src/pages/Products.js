import React, { useEffect, useState } from "react";
import Header from "./Header/Header";
import { fetchProducts } from "../services/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts().then((data) => {
      console.log(data);  // Check if data is being received properly
      setProducts(data || []);
      setFilteredProducts(data || []);
    });
  }, []);

  // Handle Search
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
      <Header />

      {/* Search & Filter */}
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
                  src={product.imageUrl || "https://via.placeholder.com/150"}
                  alt={product.name}
                  className="w-full h-40 object-cover"
                />
                <h3 className="text-xl font-semibold mt-2">{product.name}</h3>
                <p className="text-gray-600 mt-1">${product.price}</p>
                <a href={`/product/${product._id}`}>
                  <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 w-full">
                    View Details
                  </button>
                </a>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No products found</p>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center p-4 mt-6">
        <p>© 1990 SewelOilCo. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Products;
