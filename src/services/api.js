// import axios from "axios";

// const API_URL = "http://localhost:5000";

// export const fetchProducts = async () => {
//     try {
//         const response = await axios.get(`${API_URL}/products`);
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching products:", error);
//         return [];
//     }
// };

// services/api.js

export const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/products');  // Updated URL
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      console.log('Fetched Products:', data);  // Log fetched products
      return data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };
  