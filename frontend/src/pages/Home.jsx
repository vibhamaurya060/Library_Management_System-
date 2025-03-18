import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBook, FaUserGraduate, FaClipboardList, FaLaptop, FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";
import topBook from "../assets/bookImage.jpg";
import bookImage from "../assets/book.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
   

    useEffect(() => {
        fetch("https://library-management-system-szpz.onrender.com/book")
            .then((res) => res.json())
            .then((data) => {
                console.log("API Response:", data);
                setBooks(Array.isArray(data) ? data : data.books || []);
                setLoading(false);
            }) 
            .catch((error) => {
                console.error("Error fetching books:", error);
                setBooks([]); // Ensure it's always an array
                setLoading(false);
            });
    }, []);

    return (
        <div className="container mx-auto p-6 bg-gray-200 min-h-screen" style={{ marginTop: "0px" }}>

            {/* Hero Section */}
            <div style={{ height: "68vh", justifyContent: "space-around" }} className="w-full flex flex-col md:flex-row items-center gap-8 p-6 bg-white rounded-lg text-gray-700 mt-6">
                <div className="text-center md:text-left">
                    <h1 className="text-5xl mb-5 font-bold">Welcome to Our Library</h1>
                    <p className="mt-2 text-lg">Find all types of books in our library. Books are gateways to knowledge, <br/> imagination, and adventure. They educate, inspire, and transport readers to <br/> different worlds.</p>
                    <button className="mt-4 bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 rounded transition-all">
                        Explore Now
                    </button>
                </div>
                <div>
                    <img src={topBook} alt="Book Cover" style={{ width: "550px", height: "55vh" }} className=" rounded-lg " />
                </div>
            </div>
            {/* Library Features */}
            
            <h1 className="text-2xl mt-10 text-gray-600 text-center  font-bold">Features</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-6 text-center">
                
                <div className="bg-white w-82 shadow-md p-6 rounded-lg">
                    <FaBook className="text-blue-400 text-4xl mx-auto mb-3" />
                    <h3 className="text-lg font-bold">Vast Collection</h3>
                    <p className="text-gray-600">Explore thousands of books from various genres and authors.</p>
                </div>
                <div className="bg-white w-82  shadow-md p-6 rounded-lg">
                    <FaUserGraduate className="text-blue-400 text-4xl mx-auto mb-3" />
                    <h3 className="text-lg font-bold">Student-Friendly</h3>
                    <p className="text-gray-600">Access academic resources and references for your studies.</p>
                </div>
                <div className="bg-white w-82  shadow-md p-6 rounded-lg">
                    <FaClipboardList className="text-blue-400 text-4xl mx-auto mb-3" />
                    <h3 className="text-lg font-bold">Easy Borrowing</h3>
                    <p className="text-gray-600">Seamless book borrowing and return system for convenience.</p>
                </div>
                <div className="bg-white w-82  shadow-md p-6 rounded-lg">
                    <FaLaptop className="text-blue-400 text-4xl mx-auto mb-3" />
                    <h3 className="text-lg font-bold">Digital Access</h3>
                    <p className="text-gray-600">Access e-books and online resources anytime, anywhere.</p>
                </div>
            </div> 
              {/* Books Carousel */}
            <div className="mt-10">
                <h2 className="text-2xl font-bold text-center  text-gray-600 mb-6"> Books</h2>
                {loading ? (
                    <p className="text-center text-lg font-semibold">Loading books...</p>
                ) : books.length === 0 ? (
                    <p className="text-center text-red-500">No books available.</p>
                ) : (
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 4 },
                        }}
                        navigation
                        modules={[Navigation]}
                        className="mySwiper"
                    >
                        {books.map((book) => (
                            <SwiperSlide key={book._id}>
                                <div className="bg-white shadow-lg rounded-xl p-4 border border-gray-300 hover:shadow-xl transition-all">
                                    <img src={bookImage} alt="Book Cover" className="w-full object-cover rounded-md" style={{height:"36vh"}} />
                                    <h2 className="text-xl font-semibold mt-2">{book.title}</h2>
                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{book.genre}</span>
                                    <p className="text-sm text-gray-700 mt-2 font-medium">Author: {book.author}</p>
                                    <p className="text-sm text-gray-500">Year: {book.year}</p>
                                    <Link to={`/book/${book._id}`} className="block text-center bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg mt-4 transition-all">
                                        View Details
                                    </Link>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>

             {/* About Section */}
             <div className="mt-10 p-6 ">
                <h2 className="text-2xl font-bold text-center  text-gray-600 mb-4">About Our Library</h2>
                <div className="flex flex-col md:flex-row items-center gap-6" style={{justifyContent:"space-around"}}>
                    <div className="text-gray-700 text-lg">
                        <p>Our library is dedicated to providing a vast collection of books and resources to support learning, <br/> research, and leisure reading.
                        With a user-friendly management system, we ensure a seamless <br/> experience for borrowing and returning books.</p>
                    </div>
                    <div>
                        <img src={"https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="Library" style={{width:"100%", height:"40vh"}} className="object-cover rounded-lg shadow-md" />
                    </div>
                </div>
            </div>

             {/* Footer */}
             <footer style={{marginLeft: "-24px", marginRight:"-24px"}} className="bg-gray-600 text-white py-8 mt-10 shadow-md">
                <div className="container mx-auto text-center">
                    <p className="text-lg font-semibold">&copy; 2025 Library Management System. All rights reserved.</p>
                    <div className="flex justify-center gap-6 mt-4">
                        <a href="#" className="text-white text-2xl hover:text-gray-300"><FaFacebook /></a>
                        <a href="#" className="text-white text-2xl hover:text-gray-300"><FaTwitter /></a>
                        <a href="#" className="text-white text-2xl hover:text-gray-300"><FaInstagram /></a>
                        <a href="mailto:info@library.com" className="text-white text-2xl hover:text-gray-300"><FaEnvelope /></a>
                    </div>
                    <p className="mt-4">Contact us at: <a href="mailto:info@library.com" className="underline">info@library.com</a></p>
                </div>
            </footer>
        </div>
    ); 
};

export default Home;
