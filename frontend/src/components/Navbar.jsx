
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/bookLogo.png";

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
            <img src={logo} alt="Book Cover" style={{ width: "50px", height: "4vh", marginLeft:"40px" }} className=" rounded-md " />
            <div className="flex space-x-10 mx-10 text-lg font-semibold" >
                <Link to="/" className="hover:underline">Home</Link>
                {!isAuthenticated ? (
                    <>
                        <Link to="/login" className="hover:underline">Login</Link>
                    </>
                ) : (
                    <>
                        <Link to="/addbook" className="hover:underline">Add Book</Link>
                        <button onClick={handleLogout} className="bg-white text-black px-3 py-1 rounded" >Logout</button>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar;