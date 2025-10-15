import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // corrected path

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/'); // redirect to homepage after logout
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand Name */}
          <Link
            to="/"
            className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors"
          >
            <span className="text-2xl">📚</span>
            <span className="text-xl font-bold">BooksByte</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-white hover:text-gray-200 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/browse"
              className="text-white hover:text-gray-200 transition-colors font-medium"
            >
              Browse Books
            </Link>

            {/* Conditional Buttons */}
            {!isAuthenticated ? (
              <Link
                to="/admin-login"
                className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-md"
              >
                Admin Login
              </Link>
            ) : (
              <>
                <Link
                  to="/admin-dashboard"
                  className="text-white bg-indigo-800 px-4 py-2 rounded-lg font-semibold hover:bg-indigo-900 transition-colors shadow-md"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-md"
                >
                  Logout
                </button>
              </>
            )}
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
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-white hover:bg-indigo-800 transition-colors font-medium"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/browse"
              className="block px-3 py-2 rounded-md text-white hover:bg-indigo-800 transition-colors font-medium"
              onClick={toggleMenu}
            >
              Browse Books
            </Link>

            {!isAuthenticated ? (
              <Link
                to="/admin-login"
                className="block px-3 py-2 rounded-md bg-white text-indigo-600 hover:bg-gray-100 transition-colors font-semibold mx-3 text-center"
                onClick={toggleMenu}
              >
                Admin Login
              </Link>
            ) : (
              <>
                <Link
                  to="/admin-dashboard"
                  className="block px-3 py-2 rounded-md bg-indigo-800 text-white hover:bg-indigo-900 transition-colors font-semibold mx-3 text-center"
                  onClick={toggleMenu}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                  className="block w-full text-center px-3 py-2 rounded-md bg-white text-indigo-600 hover:bg-gray-100 transition-colors font-semibold mx-3"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
