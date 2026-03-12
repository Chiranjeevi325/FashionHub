import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar';
import { useAuth } from './context/AuthContext';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Marketplace from './pages/customer/Marketplace';
import Dashboard from './pages/Brand/Dashboard';

// Layout Wrapper for Brand Dashboard
const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main className="dashboard-main">
        {children}
      </main>
    </div>
  );
};

// Main App Layout for Customers
const CustomerLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          {/* Public / Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Customer Routes */}
          <Route path="/" element={
            <CustomerLayout>
              <Marketplace />
            </CustomerLayout>
          } />

          <Route path="/men" element={
            <CustomerLayout>
              <Marketplace defaultCategory="Clothing" />
            </CustomerLayout>
          } />

          <Route path="/women" element={
            <CustomerLayout>
              <Marketplace defaultCategory="Clothing" />
            </CustomerLayout>
          } />

          <Route path="/kids" element={
            <CustomerLayout>
              <Marketplace defaultCategory="Clothing" />
            </CustomerLayout>
          } />


          {/* Brand Routes (Protected) */}
          <Route path="/dashboard/*" element={
            <ProtectedRoute allowedRole="brand">
              <DashboardLayout>
                <Routes>
                  <Route index element={<Dashboard />} />
                  <Route path="products" element={<div>Products List (Phase 4)</div>} />
                  <Route path="products/create" element={<div>Create Product (Phase 4)</div>} />
                </Routes>
              </DashboardLayout>
            </ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
