import React, { useState, useContext } from 'react';
import { AppContext } from '../../App';
import axios from 'axios';

export const LoginRegisterMenu = () => {
  const { setIsLoggedIn, setUser } = useContext(AppContext);
  const [loginData, setLoginData] = useState({ name: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/Login', loginData);
      if (response.status === 200) {
        setIsLoggedIn(true);
        setUser(response.data.user);
        onClose(); 
        window.location.reload();
      } else {
        setErrorMessage(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(error.response?.data?.message || 'An error occurred during login.');
    }
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/Register', registerData);
      if (response.status === 200) {
        window.location.reload();
      } else {
        setErrorMessage(response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setErrorMessage(error.response?.data?.message || 'An error occurred during registration.');
    }
  };

  return (
    <>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-12 rounded shadow-lg w-4/5 md:w-2/3 lg:w-1/2 xl:w-2/5">
            <div className="flex justify-between">
              <div className="flex-1 pr-4">
                <h2 className="text-3xl font-bold mb-6">Login</h2>
                <form onSubmit={handleLoginSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input type="text" name="name" placeholder="Your Name" required className="w-full px-4 py-3 border rounded" onChange={handleLoginChange} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input type="password" name="password" placeholder="Your Password" required className="w-full px-4 py-3 border rounded" onChange={handleLoginChange} />
                  </div>
                  <button className="bg-gray-700 text-white px-6 py-3 rounded shadow mb-4 hover:bg-gray-400">
                    Login
                  </button>
                </form>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <div>
                  <a href="/ForgotPassword" className="text-gray-700 hover:underline">Lost my password</a>
                </div>
              </div>
              <div className="border-l border-gray-300 mx-6"></div>
              <div className="flex-1 pl-4">
                <h2 className="text-3xl font-bold mb-6">Register</h2>
                <form onSubmit={handleRegisterSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700">Name</label>
                    <input type="text" name="name" placeholder="Your Name" required className="w-full px-4 py-3 border rounded" onChange={handleRegisterChange} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Email Address</label>
                    <input type="email" name="email" placeholder="Your Email Address" required className="w-full px-4 py-3 border rounded" onChange={handleRegisterChange} />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input type="password" name="password" required placeholder="Your Password" className="w-full px-4 py-3 border rounded" onChange={handleRegisterChange} />
                  </div>
                  <button className="bg-gray-700 text-white px-6 py-3 rounded shadow hover:bg-gray-400">
                    Register
                  </button>
                </form>
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              </div>
            </div>
          </div>
        </div>
    </>
  );
};