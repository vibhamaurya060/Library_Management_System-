
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {

    const navigate = useNavigate();
    
    const handleLogout = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch("http://localhost:8080/user/logout", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                localStorage.removeItem("token");
                setIsAuthenticated(false);
                navigate("/login");
            }
        }
        catch (error) {
            console.log("Logout failed: ", error);
        }
    };

    return (
        <nav className="bg-gray-600 p-4 text-white flex justify-between items-center">
            <h1 className="text-xl font-bold">Book App</h1>
            <div className="flex space-x-4">
                <Link to="/" className="hover:underline">Home</Link>
                {!isAuthenticated ? (
                    <>
                        <Link to="/login" className="hover:underline">Login</Link>
                        
                    </>
                ) : (

                    <>
                        <Link to="/book" className="hover:underline">Add Book</Link>
                        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded" >Logout</button>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar;