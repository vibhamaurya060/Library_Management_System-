import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const API_URL="http://localhost:8080";

const Login = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_URL}/user/login`, { username, password });
      
        localStorage.setItem("token", res.data.token);
        setIsAuthenticated(true);
        alert("Login successful!");
        navigate("/");
      
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed.");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg w-96 text-center">
        <h2 className="text-3xl font-bold text-green-600 mb-6">Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border rounded mb-4 focus:ring-2 focus:ring-green-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded mb-4 focus:ring-2 focus:ring-green-400"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition"
        >
          Login
        </button>
        <p className="mt-4">
          Don't have an account? <Link to="/register" className="text-green-500 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};


export default Login