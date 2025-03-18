import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const API_URL="https://library-management-system-szpz.onrender.com";

const Register = () => {
  const [username, setUsername]=useState("");
  const [password, setPassword]= useState("");
  const [role, setRole]=useState("user");
  const navigate = useNavigate();

  const handleRegister=async()=>{
    try{
     await axios.post(`${API_URL}/user/register`,{username, password, role});
      alert("Registration successful!");
      navigate("/"); 
    }
    catch(error){
      if (error.response?.status === 409) {
        alert("User already exists! Try logging in.");
      } else {
        alert(error.response?.data.message || "Registration failed.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg w-96 text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">Signup</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 border rounded mb-4 focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded mb-4 focus:ring-2 focus:ring-blue-400"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-3 border rounded mb-4 focus:ring-2 focus:ring-blue-400"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button
          onClick={handleRegister}
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition"
        >
          Register
        </button>
        <p className="mt-4">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register