import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { fetchProducts } from "../services/api";
import ChatBot from "../components/ChatBot";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const ContactHandler = () => {
    navigate('/contact');
  };

  useEffect(() => {
    fetchProducts()
      .then((data) => {
        setProducts(data || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load products");
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen relative pt-20">
      {/* Hero Section */}
      <header
        className="bg-cover bg-center h-64 flex flex-col justify-center items-center text-white text-center"
        style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?oil,factory')" }}
      >
        <h2 className="text-4xl font-bold text-black">High-Performance Machine Oils</h2>
        <p className="mt-2 text-lg text-black">Enhance durability & efficiency with premium lubricants</p>
        <Link to="/products">
          <button className="mt-4 bg-yellow-500 text-black px-6 py-3 rounded-lg">View Products</button>
        </Link>
      </header>

      {/* Featured Products */}
      <section className="p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Our Products</h2>
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-4 shadow-lg rounded-lg">
              <img
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.name}
                className="w-full h-40 object-cover"
              />
              <h3 className="text-xl font-semibold mt-2">{product.name}</h3>
              <p className="text-gray-600 mt-1">${product.price}</p>
              <button
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 w-full"
                onClick={() => navigate(`/products/${product.id}`)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-12">
        <h2 className="text-3xl font-bold text-center">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6 text-center px-10">
          <div className="p-4 bg-gray-200 rounded-lg">
            <h3 className="text-xl font-semibold">🔧 Increases Lifespan</h3>
            <p className="text-gray-600">Our oils enhance engine durability.</p>
          </div>
          <div className="p-4 bg-gray-200 rounded-lg">
            <h3 className="text-xl font-semibold">💰 Cost-Effective</h3>
            <p className="text-gray-600">High-quality oils at the best price.</p>
          </div>
          <div className="p-4 bg-gray-200 rounded-lg">
            <h3 className="text-xl font-semibold">🏭 Industrial Use</h3>
            <p className="text-gray-600">Perfect for factories & machines.</p>
          </div>
          <div className="p-4 bg-gray-200 rounded-lg">
            <h3 className="text-xl font-semibold">🛡 Certified & Trusted</h3>
            <p className="text-gray-600">ISO & API certified oils.</p>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section className="bg-blue-900 text-white p-8 text-center">
        <h2 className="text-3xl font-bold">Get in Touch</h2>
        <p className="mt-2">For inquiries, bulk orders, or partnerships, contact us!</p>
        <button
          onClick={ContactHandler}
          className="mt-4 bg-yellow-500 text-black px-6 py-3 rounded-lg"
        >
          Contact Us
        </button>
      </section>

      {/* ✅ ChatBot Floating in Bottom-Right */}
      <div className="fixed bottom-6 right-6 z-50">
        <ChatBot />
      </div>
    </div>
  );
};

export default Home;