import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// --- Reusable BookCard Component ---
const BookCard = ({ title, author, coverImageUrl, genre }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
    <img
      src={coverImageUrl}
      alt={`Cover of ${title}`}
      className="w-full h-64 object-contain"
    />
    <div className="p-4 flex flex-col flex-grow">
      <p className="text-xs text-indigo-600 font-semibold uppercase">{genre}</p>
      <h3 className="text-lg font-bold text-slate-800 mt-1">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">by {author}</p>
      <div className="mt-auto">
        <Link
          to="https://wa.me/qr/TBLKE2A4ZHSLB1"
          className="w-full text-center bg-slate-800 text-white font-bold py-2 px-4 rounded-md hover:bg-slate-900 transition-colors duration-300 block"
        >
          Rent Now
        </Link>
      </div>
    </div>
  </div>
);

const BrowseBooksPage = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  const API_URL = "http://localhost:5000/api";

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${API_URL}/getBooks`);
        if (!response.ok) throw new Error("Data could not be fetched");
        const data = await response.json();
        setAllBooks(data);
        setFilteredBooks(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, []);

  // Filter books by genre and search
  useEffect(() => {
    let books = allBooks;

    if (selectedGenre !== "All") {
      books = books.filter((book) => book.genre === selectedGenre);
    }

    if (searchTerm) {
      books = books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBooks(books);
    setCurrentPage(1); // reset to page 1 when filters change
  }, [searchTerm, selectedGenre, allBooks]);

  // Pagination logic
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentBooks = filteredBooks.slice(firstPostIndex, lastPostIndex);
  const totalPages = Math.ceil(filteredBooks.length / postsPerPage);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800">
            Browse Our Collection
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Find your next adventure between the pages.
          </p>
        </div>

        {/* Search bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 sticky top-20 bg-slate-50/80 backdrop-blur-sm py-4 z-40">
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Search by title or author..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Books grid */}
        {currentBooks.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {currentBooks.map((book) => (
                <BookCard key={book.id} {...book} />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-10 gap-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className={`px-4 py-2 rounded-md border ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white hover:bg-indigo-50 text-indigo-600 border-indigo-300"
                }`}
              >
                Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-md border ${
                    currentPage === i + 1
                      ? "bg-indigo-600 text-white"
                      : "bg-white hover:bg-indigo-50 text-indigo-600 border-indigo-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className={`px-4 py-2 rounded-md border ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white hover:bg-indigo-50 text-indigo-600 border-indigo-300"
                }`}
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-slate-700">
              No Books Found
            </h3>
            <p className="text-gray-500 mt-2">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseBooksPage;
