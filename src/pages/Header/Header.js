import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signOut } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInitials, setUserInitials] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        const initials = user.displayName
          ? user.displayName
              .split(" ")
              .map((name) => name[0])
              .join("")
              .toUpperCase()
          : "U"; // Default to "U" if no name
        setUserInitials(initials);
      } else {
        setIsLoggedIn(false);
        setUserInitials("");
      }
    });

    return () => unsubscribe(); // Cleanup the listener
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => console.log(error));
  };

  return (
    <nav className="bg-blue-900 text-white p-4 flex justify-between items-center w-full">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold hover:text-gray-300 transition">
        SewelOilCo
      </Link>

      {/* Navigation Links */}
      <div className="flex space-x-6 text-lg">
        <Link to="/" className="hover:text-gray-300 transition">Home</Link>
        <Link to="/products" className="hover:text-gray-300 transition">Products</Link>
        <Link to="/about" className="hover:text-gray-300 transition">About</Link>
        <Link to="/contact" className="hover:text-gray-300 transition">Contact</Link>
        {isLoggedIn && (
          <Link to="/account" className="hover:text-gray-300 transition">Account</Link>
        )}
      </div>

      {/* User Authentication Section */}
      <div className="flex items-center space-x-4 relative">
        {!isLoggedIn ? (
          <button
            className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600 transition"
            onClick={handleLoginClick}
          >
            Login
          </button>
        ) : (
          <div className="relative">
            {/* User Initials (Click to Toggle Dropdown) */}
            <div
              className="bg-yellow-500 text-black font-bold w-10 h-10 flex justify-center items-center rounded-full cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {userInitials}
            </div>

            {/* Logout Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-lg p-2 w-28">
                <button
                  className="block w-full text-left px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
