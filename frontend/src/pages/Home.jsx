import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import bookImage from "../assets/book.jpg";  

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/book")
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
        <>
            <div className="w-full h-80  flex gap-6">
                <div>
                    <p>Book</p>
                </div>
                <div> 
                <img src={bookImage} alt="Book Cover" className="w-80 h-45 object-cover rounded-md" />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {!Array.isArray(books) ? (
                    <p className="text-center text-red-500">Failed to load books.</p>
                ) : (
                    books.map((book) => (
                        <div key={book.id} className="bg-white shadow-md rounded-xl p-4 border border-gray-200">
                            <img src={bookImage} alt="Book Cover" className="w-full h-45 object-cover rounded-md" />
                            <h2 className="text-lg font-semibold">{book.title}</h2>
                            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-md">{book.genre}</span>
                            <p className="text-sm text-gray-700 mt-2"><span className="font-medium">Author:</span> {book.author}</p>
                            <p className="text-sm text-gray-500"><span className="font-medium">Year:</span> {book.year}</p>
                            {/* <p className="text-xs mt-2 text-gray-600">{book.description}</p> */}
                            <button><Link to={`/book/${book._id}`} className="text-blue-500 mt-3 inline-block" >View Details</Link></button>

                        </div>
                    ))
                )}

            </div>
        </>
    );
};

export default Home;
