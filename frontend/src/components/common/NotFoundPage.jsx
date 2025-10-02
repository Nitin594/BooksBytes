import React from 'react';

export default function PageNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center">
            <span className="text-9xl">📚</span>
            <div className="mx-4">
              <h1 className="text-8xl md:text-9xl font-bold text-indigo-600">
                404
              </h1>
            </div>
            <span className="text-9xl">📖</span>
          </div>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Oops! Page Not Found
        </h2>
        
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Looks like this chapter doesn't exist in our collection. The page you're looking for seems to have been moved or deleted.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/"
            className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
          >
            Go to Homepage
          </a>
          
          <a
            href="/browse"
            className="w-full sm:w-auto bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors shadow-md hover:shadow-lg"
          >
            Browse Books
          </a>
        </div>

        {/* Additional Help */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600 mb-4">
            Need help finding something?
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="/" className="text-indigo-600 hover:text-indigo-800 hover:underline">
              Home
            </a>
            <span className="text-gray-400">•</span>
            <a href="/browse" className="text-indigo-600 hover:text-indigo-800 hover:underline">
              Browse Books
            </a>
            <span className="text-gray-400">•</span>
            <a href="/admin" className="text-indigo-600 hover:text-indigo-800 hover:underline">
              Admin Login
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}