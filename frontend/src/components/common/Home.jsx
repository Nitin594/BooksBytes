import React, { useState, useEffect } from "react";
import API_URL from "../../api/api.js";

export default function HomePage() {
  // Placeholder book data
  // const newArrivals = [
  //   { id: 1, title: "The Midnight Library", author: "Matt Haig", image: "📚" },
  //   { id: 2, title: "Atomic Habits", author: "James Clear", image: "📖" },
  //   { id: 3, title: "Project Hail Mary", author: "Andy Weir", image: "📕" },
  //   { id: 4, title: "The Seven Husbands", author: "Taylor Jenkins Reid", image: "📗" }
  // ];

  const [newArrivals, setNewArrivals] = useState([]);
  const genres = [
    "Science Fiction",
    "Mystery",
    "Fantasy",
    "Self-Help",
    "Romance",
    "Biography",
    "...and many more",
  ];

  // const API_URL = "http://localhost:5000/api";

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${API_URL}/lastFourBooks`);
        if (!response.ok) {
          throw new Error("Data could not be fetched");
        }
        const data = await response.json();
        setNewArrivals(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white py-24 px-4">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Your Next Chapter Awaits
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            A curated collection of bestsellers and hidden gems, delivered right
            to your door.
          </p>
          <a
            href="/browse"
            className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-200"
          >
            Browse All Books
          </a>
        </div>
      </section>

      {/* 2. Featured Books Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            New Arrivals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((book) => (
              <div
                key={book._id}
                className="bg-gray-50 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-200"
              >
                <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg h-74 flex items-center justify-center mb-4">
                    {book.coverImageUrl ? (
                      <img
                        src={book.coverImageUrl}
                        alt={book.title}
                        className="object-cover h-full w-full rounded-lg"
                      />
                    ) : (
                      <span className="text-6xl">📚</span> // fallback emoji if no image
                    )}
                  
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {book.title}
                </h3>
                <p className="text-gray-600">{book.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Shop by Genre Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Explore all Genre
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {genres.map((genre, index) => (
              <a
                key={index}
                href="/browse"
                className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-xl hover:bg-indigo-50 transition-all duration-200 transform hover:-translate-y-1"
              >
                <p className="text-lg font-semibold text-gray-800">{genre}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Why BooksByte?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Column 1: Easy Ordering */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Easy Ordering
              </h3>
              <p className="text-gray-600">Order in seconds via WhatsApp.</p>
            </div>

            {/* Column 2: Curated Collection */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Curated Collection
              </h3>
              <p className="text-gray-600">Hand-picked books you'll love.</p>
            </div>

            {/* Column 3: Support Local */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
                <svg
                  className="w-8 h-8 text-pink-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Support Local
              </h3>
              <p className="text-gray-600">
                Your purchase supports a passionate book lover.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Final Call-to-Action Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Ready to Find Your Next Read?
          </h2>
          <a
            href="/browse"
            className="inline-block bg-white text-indigo-600 px-10 py-5 rounded-lg text-xl font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-200"
          >
            Explore the Full Collection
          </a>
        </div>
      </section>
    </div>
  );
}
