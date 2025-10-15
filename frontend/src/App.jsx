import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import HomePage from "./components/common/Home";
import BrowseBooksPage from "./components/books/BrowseBooks";
import AdminLoginPage from "./components/Auth/Login";
import AdminDashboard from "./components/admin/Dashboard";
import PageNotFound from "./components/common/NotFoundPage";
import "./App.css";

import { useAuth } from "./context/AuthContext"; 

function App() {
  // It's better to get the auth state inside the component
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/browse" element={<BrowseBooksPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />

        {/* Protected Admin Route */}
        <Route
          path="/admin-dashboard"
          element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/admin-login" />}
        />

        {/* Catch-all Not Found Route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;