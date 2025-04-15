import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signOut } from "../../firebase-config";
import { onAuthStateChanged } from "firebase/auth";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInitials, setUserInitials] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        const initials = user.displayName
          ? user.displayName
              .split(" ")
              .map((name) => name[0])
              .join("")
              .toUpperCase()
          : "U";
        setUserInitials(initials);
      } else {
        setIsLoggedIn(false);
        setUserInitials("");
      }
    });

    return () => unsubscribe();
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

  // Handle outside click for closing dropdown
  const handleOutsideClick = useCallback(
    (e) => {
      if (dropdownOpen && !e.target.closest(".dropdown-container")) {
        setDropdownOpen(false);
      }
    },
    [dropdownOpen]
  );

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [handleOutsideClick]);

  return (
    <nav className="bg-blue-900 text-white p-4 flex justify-between items-center w-full z-50">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold hover:text-gray-300 transition">
        SewelOilCo
      </Link>

      {/* Navigation Links */}
      <div className="flex space-x-6 text-lg">
        <Link to="/" className="hover:text-gray-300 transition">Home</Link>
        <Link to="/products" className="hover:text-gray-300 transition">Products</Link>
        <span
          onClick={() => navigate("/", { state: { scrollToId: "about" } })}
          className="hover:text-gray-300 transition cursor-pointer"
        >
          About
        </span>
        <span
          onClick={() => navigate("/", { state: { scrollToId: "contact" } })}
          className="hover:text-gray-300 transition cursor-pointer"
        >
          Contact
        </span>
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
          <div className="relative dropdown-container">
            {/* Initials Circle */}
            <div
              className="bg-yellow-500 text-black font-bold w-10 h-10 flex justify-center items-center rounded-full cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {userInitials}
            </div>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-lg p-2 w-28 z-50">
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
