import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, LogOut, Menu, X, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar glass">
            <div className="container nav-content">
                <Link to="/" className="logo">
                    Market<span>Nest</span>
                </Link>

                <div className="nav-actions desktop-only">
                    <div className="search-bar">
                        <Search size={18} />
                        <input type="text" placeholder="Search brands, styles..." />
                    </div>

                    <div className="nav-links">
                        <Link to="/">Marketplace</Link>
                        {user?.role === 'brand' && (
                            <Link to="/dashboard">Dashboard</Link>
                        )}
                    </div>

                    <div className="user-actions">
                        {user ? (
                            <div className="auth-user">
                                <span className="user-name">{user.name}</span>
                                <button onClick={handleLogout} title="Logout">
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="btn-premium">Login</Link>
                        )}
                    </div>
                </div>

                <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    {isMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="mobile-menu glass">
                    <Link to="/" onClick={() => setIsMenuOpen(false)}>Marketplace</Link>
                    {user?.role === 'brand' && (
                        <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                    )}
                    {user ? (
                        <button onClick={() => { handleLogout(); setIsMenuOpen(false); }}>Logout</button>
                    ) : (
                        <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
