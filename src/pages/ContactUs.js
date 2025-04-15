import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   try {
  //     const response = await fetch("http://localhost:5000/send-email", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });
  
  //     // Check if the response is JSON before attempting to parse
  //     const result = await response.text();  // Get the response as text first
  
  //     if (response.ok) {
  //       alert("Message sent successfully!");
  //     } else {
  //       try {
  //         // Try to parse the response as JSON if possible
  //         const parsedResult = JSON.parse(result);
  //         alert(parsedResult.message || "There was an error sending the message.");
  //       } catch (parseError) {
  //         // If parsing fails, show the plain text error message
  //         alert(result);
  //       }
  //     }
  
  //     // Clear the form
  //     setFormData({ name: "", email: "", message: "" });
  //   } catch (error) {
  //     console.error("Error:", error);  // Log the error for better insight
  //     alert("An error occurred. Please try again later.");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();  // Parse response as JSON
  
      if (response.ok) {
        alert("Message sent successfully!");
      } else {
        alert(result.message || "There was an error sending the message.");
      }
  
      // Clear the form
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };
    


  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar at the top */}
      {/* <Header /> */}

      {/* Main Content */}
      <div className="flex flex-col items-center p-6">
        {/* Page Heading */}
        <div className="w-full max-w-3xl text-center mb-8 mt-6">
          <h2 className="text-4xl font-bold text-blue-900">Contact Us</h2>
          <p className="text-gray-600 mt-2">
            We would love to hear from you! Reach out to us for any inquiries.
          </p>
        </div>

        {/* Contact Info & Form Container */}
        <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-blue-900 mb-4">
              Get in Touch
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FaMapMarkerAlt className="text-blue-700 text-xl" />
                <p className="text-gray-700">
                  195, Tezab Mill Campus Near Anwarganj Station Kanpur (U.P) 208003
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-blue-700 text-xl" />
                <p className="text-gray-700">+91 8765172625</p>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-blue-700 text-xl" />
                <p className="text-gray-700">seweloilcom@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-blue-900 mb-4">
              Send a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Footer */}
        {/* <div className="text-center mt-8 text-gray-600">
          <p>© 1990 SewelOilCo. All rights reserved.</p>
        </div> */}
      </div>
    </div>
  );
};

export default ContactUs;
