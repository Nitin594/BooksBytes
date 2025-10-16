import { useState, useEffect } from 'react';
import BookUploadForm from './Upload';
import API_URL from '../../api/api.js';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);

  // const API_URL = "http://localhost:5000/api";

  const stats = {
    totalBooks: allBooks.length,
    availableBooks: allBooks.filter(b => b.isAvailable).length,
    unavailableBooks: allBooks.filter(b => !b.isAvailable).length,
    totalGenres: new Set(allBooks.map(b => b.genre)).size
  };

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
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  // Filter books when search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredBooks(allBooks);
    } else {
      const filtered = allBooks.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  }, [searchTerm, allBooks]);

  const handleDeleteBook = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const response = await fetch(`${API_URL}/deleteBook/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete book');
        setAllBooks(prev => prev.filter(book => book._id !== id));
      } catch (err) {
        console.error(err);
        alert('Failed to delete the book.');
      }
    }
  };

  const handleToggleAvailability = async (id) => {
    try {
      const response = await fetch(`${API_URL}/toggleAvailability/${id}`, {
        method: 'PUT',
      });
      if (!response.ok) throw new Error('Failed to update availability');
      const updatedBook = await response.json();
      setAllBooks(prev =>
        prev.map(book => (book._id === id ? updatedBook : book))
      );
    } catch (err) {
      console.error(err);
      alert('Failed to toggle availability.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your BookBytes collection</p>
            </div>
            <Link
              href="/"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              View Site
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Books', value: stats.totalBooks, color: 'indigo' },
            { label: 'Available', value: stats.availableBooks, color: 'green' },
            { label: 'Unavailable', value: stats.unavailableBooks, color: 'red' },
            { label: 'Genres', value: stats.totalGenres, color: 'purple' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{item.label}</p>
                  <p className={`text-3xl font-bold text-${item.color}-600 mt-2`}>
                    {item.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              {['overview', 'books', 'add'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab
                      ? 'border-indigo-600 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab === 'overview'
                    ? 'Overview'
                    : tab === 'books'
                    ? 'All Books'
                    : 'Add New Book'}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Overview */}
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                <p className="text-gray-600">Recent updates will appear here.</p>
              </div>
            )}

            {/* Books */}
            {activeTab === 'books' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">All Books</h2>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search books..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                    />
                    <svg
                      className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Genre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date Added</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredBooks.length > 0 ? (
                        filteredBooks.map((book) => (
                          <tr key={book._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{book.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{book.author}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                                {book.genre}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  book.isAvailable
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                }`}
                              >
                                {book.isAvailable ? 'Available' : 'Unavailable'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {new Date(book.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              {/* <button
                                onClick={() => handleToggleAvailability(book._id)}
                                className="text-indigo-600 hover:text-indigo-900 mr-4"
                              >
                                Toggle
                              </button> */}
                              <button
                                onClick={() => handleDeleteBook(book._id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center py-6 text-gray-500">
                            No books found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Add Book */}
            {activeTab === 'add' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Book</h2>
                <p className="text-gray-600 mb-4">
                  Use the form below to add new books to your collection.
                </p>
                <BookUploadForm />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
