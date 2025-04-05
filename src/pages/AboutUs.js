import React from 'react';
import Header from './Header/Header';
const AboutUs = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar
      <nav className="bg-blue-900 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">SewelOilCo</h1>
        <div>
          <a href="/" className="mx-3">Home</a>
          <a href="/products" className="mx-3">Products</a>
          <a href="/about" className="mx-3">About</a>
          <a href="#" className="mx-3">Contact</a>
          <button className="ml-4 bg-yellow-500 px-4 py-2 rounded">Login</button>
        </div>
      </nav> */}
      <Header/>

      {/* About Section */}
      <section className="text-center p-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
        <p className="text-lg text-gray-600 mb-8">
          Welcome to SewelOilCo, a leading provider of high-performance machine oils designed to keep your engines and industrial machinery running at peak efficiency.
          Our mission is to provide premium lubricants that not only enhance the longevity of machines but also promote cost-effective and environmentally sustainable operations.
        </p>
        
        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Vision</h3>
            <p className="text-gray-600">
              To become a global leader in the oil industry by offering cutting-edge lubricants that drive operational excellence in every machine.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Mission</h3>
            <p className="text-gray-600">
              Deliver high-quality, reliable, and cost-effective oils to industries worldwide, ensuring machinery longevity and minimizing downtime.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-blue-900 text-white py-12 mt-12">
          <h2 className="text-3xl font-bold text-center mb-6">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">Quality</h3>
              <p className="text-gray-300">We ensure the highest quality standards in all our products, every time.</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">Innovation</h3>
              <p className="text-gray-300">Constantly researching and developing new solutions to improve machinery performance.</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">Sustainability</h3>
              <p className="text-gray-300">Committed to reducing environmental impact and promoting eco-friendly practices in oil production.</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold">Customer Focused</h3>
              <p className="text-gray-300">Our customers’ satisfaction is our top priority, providing excellent service and reliable products.</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <section className="py-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
          <p className="text-lg text-gray-600 mb-8">Our team of experts is dedicated to providing the best machine oils for industries worldwide.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
            {/* Team Member 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img className="w-32 h-32 rounded-full mx-auto mb-4" src="/Photograph1.jpg" alt="Team Member" />
              <h3 className="text-xl font-semibold text-gray-800">Paresh Nidhi Khare</h3>
              <p className="text-gray-600">CEO & Founder</p>
            </div>
            {/* Team Member 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img className="w-32 h-32 rounded-full mx-auto mb-4" src="/Photograph2.jpg" alt="Team Member" />
              <h3 className="text-xl font-semibold text-gray-800">Seema Khare</h3>
              <p className="text-gray-600">Product Development Manager</p>
            </div>
            {/* Team Member 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <img className="w-32 h-32 rounded-full mx-auto mb-4" src="/Photograph.jpg" alt="Team Member" />
              <h3 className="text-xl font-semibold text-gray-800">Prakul Nidhi Khare</h3>
              <p className="text-gray-600">Head of Sales</p>
            </div>
          </div>
        </section>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center p-4">
        <p>© 1990 SewelOilCo. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;
