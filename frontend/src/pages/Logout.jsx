import React from 'react'

const API_URL="https://library-management-system-szpz.onrender.com";

const Logout=({ setIsLoggedIn, token, setToken })=> {
    const handleLogout = async () => {
      try {
        await axios.post(
          `${API_URL}/user/logout`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        localStorage.removeItem("token");
        setToken("");
        setIsLoggedIn(false);
        alert("Logout successful!");
      } catch (error) {
        alert(error.response?.data.message || "Logout failed.");
      }
    };
  
    return (
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    );
  }
  
export default Logout