import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Marketplace from './pages/customer/Marketplace';
import ProductDetail from './pages/customer/ProductDetail';
import Dashboard from './pages/Brand/Dashboard';
import AddProduct from './pages/Brand/AddProduct';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

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
      <CartProvider>
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
                <Marketplace defaultCategory="Men" />
              </CustomerLayout>
            } />

            <Route path="/women" element={
              <CustomerLayout>
                <Marketplace defaultCategory="Women" />
              </CustomerLayout>
            } />

            <Route path="/kids" element={
              <CustomerLayout>
                <Marketplace defaultCategory="Kids" />
              </CustomerLayout>
            } />

            {/* Product Detail */}
            <Route path="/products/:id" element={
              <CustomerLayout>
                <ProductDetail />
              </CustomerLayout>
            } />

            {/* Profile (both roles) */}
            <Route path="/profile" element={
              <CustomerLayout>
                <Profile />
              </CustomerLayout>
            } />

            {/* Cart */}
            <Route path="/cart" element={
              <CustomerLayout>
                <Cart />
              </CustomerLayout>
            } />

            {/* Checkout */}
            <Route path="/checkout" element={
              <CustomerLayout>
                <Checkout />
              </CustomerLayout>
            } />

            {/* Brand Routes (Protected) */}
            <Route path="/dashboard/*" element={
              <ProtectedRoute allowedRole="brand">
                <DashboardLayout>
                  <Routes>
                    <Route index element={<Dashboard />} />
                    <Route path="products" element={<div>Products List (Coming Soon)</div>} />
                    <Route path="products/create" element={<AddProduct />} />
                    <Route path="profile" element={<Profile />} />
                  </Routes>
                </DashboardLayout>
              </ProtectedRoute>
            } />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
