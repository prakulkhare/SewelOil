import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Products from './pages/Products';
import ProductDetail from "./pages/ProductDetail";
import AboutUs from './pages/AboutUs';
import SignUp from "./pages/SignUp";
import ContactUs from "./pages/ContactUs";
import Account from "./pages/Account";
import Homepage from './Homepage';
import Header from './pages/Header/Header';

function App() {
  const location = useLocation();

  // Check if the current path is either /login or /signup
  const showHeader = !['/login', '/signup'].includes(location.pathname);

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </>
  );
}

export default App;