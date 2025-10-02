import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand Name */}
          <a href="/" className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors">
            <span className="text-2xl">📚</span>
            <span className="text-xl font-bold">BookBytes</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-white hover:text-gray-200 transition-colors font-medium">
              Home
            </a>
            <a href="/browse" className="text-white hover:text-gray-200 transition-colors font-medium">
              Browse Books
            </a>
            <a 
              href="/admin-login" 
              className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-md"
            >
              Admin Login
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 rounded p-2"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="/"
              className="block px-3 py-2 rounded-md text-white hover:bg-indigo-800 transition-colors font-medium"
              onClick={toggleMenu}
            >
              Home
            </a>
            <a
              href="/browse"
              className="block px-3 py-2 rounded-md text-white hover:bg-indigo-800 transition-colors font-medium"
              onClick={toggleMenu}
            >
              Browse Books
            </a>
            <a
              href="/admin-login"
              className="block px-3 py-2 rounded-md bg-white text-indigo-600 hover:bg-gray-100 transition-colors font-semibold mx-3 text-center"
              onClick={toggleMenu}
            >
              Admin Login
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}