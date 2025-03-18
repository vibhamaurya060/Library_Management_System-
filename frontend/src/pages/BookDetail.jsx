import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import bookImage from "../assets/book.jpg"; 

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://library-management-system-szpz.onrender.com/book/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!book) {
    return <p className="text-center text-red-500 mt-10">Book not found.</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link to="/" className="text-blue-500">&larr; Back to Home</Link>
      <div className="bg-white shadow-md rounded-xl p-6 mt-4 border border-gray-200">
        <img src={bookImage} alt="Book Cover" className="w-full h-45 object-cover rounded-md" />
        <h1 className="text-2xl font-bold">{book.title}</h1><br/>
        <span className="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded-md">{book.genre}</span>
        <p className="text-lg text-gray-700 mt-2"><span className="font-medium">Author:</span> {book.author}</p>
        <p className="text-md text-gray-500"><span className="font-medium">Year:</span> {book.year}</p>
        <p className="text-md text-gray-600 mt-4">{book.description}</p>
      </div>
    </div>
  );
};

export default BookDetail;
