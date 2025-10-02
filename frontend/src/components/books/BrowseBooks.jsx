import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// --- Reusable BookCard Component ---
// In a real app, you would import this from its own file.
const BookCard = ({ title, author, imageUrl, genre }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
    <img src={imageUrl} alt={`Cover of ${title}`} className="w-full h-64 object-cover" />
    <div className="p-4 flex flex-col flex-grow">
      <p className="text-xs text-indigo-600 font-semibold uppercase">{genre}</p>
      <h3 className="text-lg font-bold text-slate-800 mt-1">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">by {author}</p>
      <div className="mt-auto">
        <Link to="#" className="w-full text-center bg-slate-800 text-white font-bold py-2 px-4 rounded-md hover:bg-slate-900 transition-colors duration-300 block">
            Order Now
        </Link>
      </div>
    </div>
  </div>
);


const BrowseBooksPage = () => {
    // --- State Management ---
    const [allBooks, setAllBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [genres, setGenres] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('All');

    // --- Mock Data ---
    // In a real app, this would come from an API call in useEffect
    const mockBooks = [
        { id: 1, title: "Dune", author: "Frank Herbert", genre: "Science Fiction", imageUrl: "https://placehold.co/400x600/f97316/white?text=Dune" },
        { id: 2, title: "The Silent Patient", author: "Alex Michaelides", genre: "Thriller", imageUrl: "https://placehold.co/400x600/be123c/white?text=The+Silent\nPatient" },
        { id: 3, title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", imageUrl: "https://placehold.co/400x600/16a34a/white?text=The+Hobbit" },
        { id: 4, title: "Sapiens", author: "Yuval Noah Harari", genre: "Biography", imageUrl: "https://placehold.co/400x600/0ea5e9/white?text=Sapiens" },
        { id: 5, title: "Educated", author: "Tara Westover", genre: "Biography", imageUrl: "https://placehold.co/400x600/8b5cf6/white?text=Educated" },
        { id: 6, title: "Where the Crawdads Sing", author: "Delia Owens", genre: "Mystery", imageUrl: "https://placehold.co/400x600/475569/white?text=Where+the\nCrawdads+Sing" },
        { id: 7, title: "The Four Winds", author: "Kristin Hannah", genre: "Fantasy", imageUrl: "https://placehold.co/400x600/facc15/black?text=The+Four\nWinds" },
        { id: 8, title: "Deep Work", author: "Cal Newport", genre: "Self-Help", imageUrl: "https://placehold.co/400x600/1f2937/white?text=Deep\nWork" },
    ];
    const mockGenres = ["All", "Science Fiction", "Mystery", "Fantasy", "Self-Help", "Biography", "Thriller"];


    // --- Effects ---
    // Simulate fetching data when the component mounts
    useEffect(() => {
        setAllBooks(mockBooks);
        setFilteredBooks(mockBooks);
        setGenres(mockGenres);
    }, []);

    // Apply filters whenever searchTerm or selectedGenre changes
    useEffect(() => {
        let books = allBooks;

        // Filter by genre
        if (selectedGenre !== 'All') {
            books = books.filter(book => book.genre === selectedGenre);
        }

        // Filter by search term (case-insensitive)
        if (searchTerm) {
            books = books.filter(book =>
                book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredBooks(books);
    }, [searchTerm, selectedGenre, allBooks]);


    return (
        <div className="bg-slate-50 min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800">Browse Our Collection</h1>
                    <p className="mt-4 text-lg text-gray-600">Find your next adventure between the pages.</p>
                </div>

                {/* Filters and Search Bar */}
                <div className="flex flex-col md:flex-row gap-4 mb-8 sticky top-20 bg-slate-50/80 backdrop-blur-sm py-4 z-40">
                    <div className="flex-grow">
                        <input
                            type="text"
                            placeholder="Search by title or author..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="md:w-1/4">
                         <select
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white"
                            value={selectedGenre}
                            onChange={e => setSelectedGenre(e.target.value)}
                         >
                            {genres.map(genre => (
                                <option key={genre} value={genre}>{genre}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Books Grid */}
                {filteredBooks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredBooks.map(book => (
                            <BookCard key={book.id} {...book} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <h3 className="text-2xl font-semibold text-slate-700">No Books Found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BrowseBooksPage;
