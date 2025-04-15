import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, createUserWithEmailAndPassword, provider, signInWithPopup } from '../firebase-config';
import { signOut } from 'firebase/auth';  // To log out the user

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null); // State to track the user
  const navigate = useNavigate();

  // Check if the user is logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser); // Subscribe to auth state changes
    return () => unsubscribe(); // Cleanup on component unmount
  }, []);

  // Email/Password SignUp handler
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage('Account created successfully! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
  };

  // Google SignUp handler
  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setMessage(`Hello, ${user.displayName}! You are signed in.`);

      // Save the user's login status to localStorage
      localStorage.setItem('isLoggedIn', 'true');

      navigate('/');
    } catch (error) {
      setMessage('Failed to sign in with Google: ' + error.message);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setMessage('You have logged out.');

      // Remove the login status from localStorage
      localStorage.removeItem('isLoggedIn');

      navigate('/login');
    } catch (error) {
      setMessage('Error logging out: ' + error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
      <div className="w-96 p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-indigo-600">SewelOilCo</h1>
          <p className="text-gray-500 text-lg">Premium Machine Oils</p>
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">Create an Account</h2>

        {message && <p className="text-center text-green-500 mb-4">{message}</p>}

        {/* Render the signup form only if the user is not logged in */}
        {!user && (
          <form onSubmit={handleSignUp}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500">
              Sign Up
            </button>
          </form>
        )}

        {/* Google SignUp button */}
        {!user && (
          <button
            onClick={handleGoogleSignUp}
            className="w-full mt-4 bg-red-600 text-white py-3 rounded-lg hover:bg-red-500"
          >
            Sign Up with Google
          </button>
        )}

        {/* Show Login/Logout button based on the user's sign-in state */}
        {user ? (
          <button
            onClick={handleLogout}
            className="w-full mt-4 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-500"
          >
            Logout
          </button>
        ) : (
          <p className="text-center mt-4">
            Already have an account?{" "}
            <button className="text-blue-600 hover:underline" onClick={() => navigate('/login')}>
              Login
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
