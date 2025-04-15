import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaUserEdit, FaMapMarkerAlt, FaKey, FaCreditCard, 
  FaSignOutAlt, FaBell, FaClipboardList, FaHeart, FaHeadset, FaMoon, FaSun
} from 'react-icons/fa';

const AccountButton = ({ icon, text, onClick, color }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-between w-full px-5 py-3 rounded-lg shadow-md transition-all duration-300 
                bg-gradient-to-r ${color} text-white hover:opacity-90`}
  >
    <div className="flex items-center gap-3">
      <span className="text-xl">{icon}</span>
      <span className="text-lg font-medium">{text}</span>
    </div>
    <span className="text-xl">›</span>
  </button>
);

const Account = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login'); // Redirect to login page if not logged in
    } else {
      setUserName(localStorage.getItem('userName') || 'User');
      setUserEmail(localStorage.getItem('userEmail') || 'No Email');
      setDarkMode(localStorage.getItem('darkMode') === 'true');
    }
  }, [navigate]);

  // ✅ Logout Function
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  // ✅ Toggle Dark Mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} flex flex-col items-center`}>
      {/* ✅ Reusable Header */}

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
          <AccountButton 
            icon={<FaUserEdit />} 
            text="Edit Profile" 
            onClick={() => navigate('/edit-account')} 
            color="from-blue-500 to-blue-600"
          />
          <AccountButton 
            icon={<FaMapMarkerAlt />} 
            text="Your Address" 
            onClick={() => navigate('/address')} 
            color="from-gray-500 to-gray-600"
          />
          <AccountButton 
            icon={<FaKey />} 
            text="Change Password" 
            onClick={() => navigate('/change-password')} 
            color="from-gray-500 to-gray-600"
            // color="from-orange-500 to-orange-600"
          />
          <AccountButton 
            icon={<FaCreditCard />} 
            text="Payment Methods" 
            onClick={() => navigate('/payment-methods')} 
            color="from-purple-500 to-purple-600"
          />

          {/* ✅ Fix: Notification & Support Buttons Now Fully Visible */}
          <AccountButton 
            icon={<FaBell />} 
            text="Notification Settings" 
            onClick={() => navigate('/notifications')} 
            // color="from-teal-500 to-teal-600"
            color="from-gray-500 to-gray-600"

          />
          <AccountButton 
            icon={<FaClipboardList />} 
            text="Order History" 
            onClick={() => navigate('/order-history')} 
            color="from-indigo-500 to-indigo-600"
          />
          <AccountButton 
            icon={<FaHeart />} 
            text="Wishlist" 
            onClick={() => navigate('/wishlist')} 
            color="from-pink-500 to-pink-600"
          />
          <AccountButton 
            icon={<FaHeadset />} 
            text="Support & Help" 
            onClick={() => navigate('/support')} 
            // color="from-orange-500 to-orange-600"
            color="from-gray-500 to-gray-600"
          />

          {/* ✅ Dark Mode Toggle */}
          <button 
            className="flex items-center justify-between px-5 py-3 rounded-lg shadow-md bg-gradient-to-r bg-gray-800 text-white hover:opacity-90 w-full"
            onClick={toggleDarkMode}
          >
            <div className="flex items-center gap-3">
              {darkMode ? <FaSun className="text-2xl" /> : <FaMoon className="text-2xl" />}
              <span className="text-lg font-medium">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </div>
            <span className="text-xl">›</span>
          </button>

          {/* ✅ Logout Button */}
          <AccountButton 
            icon={<FaSignOutAlt />} 
            text="Logout" 
            onClick={handleLogout} 
            color="from-red-500 to-red-600"
          />
        </div>
      </div>
    </div>
  );
};

export default Account;
