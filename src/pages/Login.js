import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  auth, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  provider 
} from '../firebase-config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // ✅ Email/Password Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccessMessage('✅ Login Successful! Redirecting...');
      setError('');

      // ⏳ Wait 2 seconds before navigating
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      setError(error.message || 'Invalid email or password');
      setSuccessMessage('');
    }
  };

  // ✅ Google Login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setSuccessMessage(`✅ Welcome back, ${user.displayName}! Redirecting...`);

      // ⏳ Wait 2 seconds before navigating
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      setError(error.message || 'Failed to log in with Google');
      setSuccessMessage('');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
      <div className="w-96 p-8 bg-white rounded-lg shadow-2xl">
        {/* ✅ Branding */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-indigo-600">SewelOilCo</h1>
          <p className="text-gray-500 text-lg">Premium Machine Oils</p>
        </div>

        {/* ✅ Success & Error Messages */}
        {successMessage && (
          <div className="text-green-500 text-center mb-4 text-lg font-semibold">{successMessage}</div>
        )}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* ✅ Login Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-500 transition duration-200"
          >
            Login
          </button>
        </form>

        {/* ✅ Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 bg-red-600 text-white py-3 rounded-lg hover:bg-red-500"
        >
          Login with Google
        </button>

        {/* ✅ Sign Up Link */}
        <div className="text-center mt-4">
          <p className="text-gray-600">Don't have an account?</p>
          <button
            className="text-indigo-600 hover:underline"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </div>

        {/* ✅ Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>&copy; 1990 SewelOilCo. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
