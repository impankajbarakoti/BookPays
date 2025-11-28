import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const APIURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function AllBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get(`${APIURL}/api/books/fetch`)
      .then((res) => {
        console.log("API RESPONSE:", res.data);
        setBooks(res.data.result); // ✅ FIX: because array name = result
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="w-[90%] mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-10">All Books</h1>

      {books.length === 0 ? (
        <h3 className="text-center text-lg">No books found</h3>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white shadow-lg rounded-xl p-5 hover:shadow-2xl transition"
            >
              <img
                src={book.coverUrl} // ✅ backend key = coverUrl
                alt=""
                className="w-full h-64 object-cover rounded-md mb-4"
              />

              <h3 className="text-xl font-semibold mb-2">{book.title}</h3>

              <p className="text-gray-600 text-sm mb-3">
                {book.description?.substring(0, 70)}...
              </p>

              <p className="text-lg font-bold mb-3">₹{book.price}</p>

              {/* <a
                href={`/book/${book._id}`}
                className="block w-full text-center py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
              >
                View Book
              </a> */}
              <a
                href={`/book/${book._id}`} // This links to the dynamic book detail page
                className="block w-full text-center py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
              >
                View Book
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
