import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaHome, FaShoppingCart, FaBox, FaUserEdit, 
  FaMapMarkerAlt, FaKey, FaCreditCard, FaSignOutAlt, 
  FaBell, FaClipboardList, FaHeart, FaHeadset, FaMoon, FaSun
} from "react-icons/fa";

const Account = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/login"); // Redirect if user is not logged in
    } else {
      setUserName(localStorage.getItem("userName") || "User");
      setUserEmail(localStorage.getItem("userEmail") || "No Email");
      setDarkMode(localStorage.getItem("darkMode") === "true");
    }
  }, [navigate]);

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  // ✅ Toggle Dark Mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} flex flex-col items-center`}>
      {/* ✅ Navbar */}
      <nav className="bg-blue-600 text-white py-4 px-6 flex justify-between items-center shadow-md w-full">
        <h1 
          className="text-xl font-bold cursor-pointer no-underline" 
          onClick={() => navigate("/")} // ✅ Redirect to Home on click
        >
          SewelOilCo
        </h1>
        <div className="flex gap-4">
          <button onClick={() => navigate("/")} className="hover:no-underline flex items-center gap-1">
            <FaHome /> Home
          </button>
          <button onClick={() => navigate("/cart")} className="hover:no-underline flex items-center gap-1">
            <FaShoppingCart /> Your Cart
          </button>
          <button onClick={() => navigate("/orders")} className="hover:no-underline flex items-center gap-1">
            <FaBox /> Your Orders
          </button>
        </div>
      </nav>

      {/* ✅ Account Details */}
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Your Account</h2>
        <div className="mb-4">
          <p className="font-semibold">Name:</p>
          <p className="text-gray-700">{userName}</p>
        </div>
        <div className="mb-4">
          <p className="font-semibold">Email:</p>
          <p className="text-gray-700">{userEmail}</p>
        </div>

        {/* ✅ Account Settings (Now Fully Visible & Organized) */}
        <div className="flex flex-col gap-4 mt-6 w-full">
          <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex items-center justify-center gap-2 w-full" onClick={() => navigate("/edit-account")}> 
            <FaUserEdit /> Edit Profile
          </button>
          <button className="bg-gray-600 text-white py-2 rounded hover:bg-gray-700 flex items-center justify-center gap-2 w-full" onClick={() => navigate("/address")}> 
            <FaMapMarkerAlt /> Your Address
          </button>
          <button className="bg-orange-600 text-white py-2 rounded hover:bg-orange-700 flex items-center justify-center gap-2 w-full" onClick={() => navigate("/change-password")}> 
            <FaKey /> Change Password
          </button>
          <button className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700 flex items-center justify-center gap-2 w-full" onClick={() => navigate("/payment-methods")}> 
            <FaCreditCard /> Payment Methods
          </button>

          {/* ✅ Fix: Notification & Support Buttons Now Fully Visible */}
          <button className="bg-teal-600 text-white py-2 rounded hover:bg-teal-700 flex items-center justify-center gap-2 w-full" onClick={() => navigate("/notifications")}> 
            <FaBell /> Notification Settings
          </button>
          <button className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 flex items-center justify-center gap-2 w-full" onClick={() => navigate("/order-history")}> 
            <FaClipboardList /> Order History
          </button>
          <button className="bg-pink-600 text-white py-2 rounded hover:bg-pink-700 flex items-center justify-center gap-2 w-full" onClick={() => navigate("/wishlist")}> 
            <FaHeart /> Wishlist
          </button>
          <button className="bg-orange-600 text-white py-2 rounded hover:bg-orange-700 flex items-center justify-center gap-2 w-full" onClick={() => navigate("/support")}> 
            <FaHeadset /> Support & Help
          </button>

          {/* ✅ Dark Mode Toggle */}
          <button 
            className="bg-gray-800 text-white py-2 rounded hover:bg-gray-900 flex items-center justify-center gap-2 w-full"
            onClick={toggleDarkMode}
          >
            {darkMode ? <FaSun /> : <FaMoon />} {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          {/* ✅ Logout Button */}
          <button className="bg-red-600 text-white py-2 rounded hover:bg-red-700 flex items-center justify-center gap-2 w-full" onClick={handleLogout}> 
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Account;
