import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import HomePage from "./components/common/Home";
import BrowseBooksPage from "./components/books/BrowseBooks";
import PageNotFound from "./components/common/NotFoundPage";
import AdminLoginPage from "./components/Auth/Login";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<HomePage />} />

        {/* Browse Page */}
        <Route path="/browse" element={<BrowseBooksPage />} />
        <Route path="/admin-login" element={<AdminLoginPage/>} />

        {/* Catch-all for undefined routes */}
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
