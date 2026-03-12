import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { ShoppingBag, Search, Heart, User, LogOut } from 'lucide-react';
import './Layout.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { itemCount } = useCart();
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            if (searchQuery.trim()) {
                navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
                setSearchQuery('');
            }
        }
    };

    return (
        <header className="market-header">
            {/* Top Tier: Utility Bar */}
            <div className="top-tier">
                <div className="container top-tier-content">
                    <div className="left-utils">
                        {/* Removed Customer Care and MarketNest Luxe */}
                    </div>
                    <div className="right-utils">
                        {user ? (
                            <>
                                <Link to="/profile" className="profile-link-top">
                                    <User size={14} /> {user.name}
                                </Link>
                                <button onClick={logout} className="logout-link">Sign Out</button>
                            </>
                        ) : (
                            <Link to="/login">Join MarketNest / Sign In</Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Tier: Navigation & Search */}
            <div className="main-tier">
                <div className="container main-tier-content">
                    <Link to="/" className="market-logo">
                        MARKET<span>NEST</span>
                    </Link>

                    <div className="main-nav-links">
                        <NavLink to="/" end>HOME</NavLink>
                        <NavLink to="/men">MEN</NavLink>
                        <NavLink to="/women">WOMEN</NavLink>
                        <NavLink to="/kids">KIDS</NavLink>
                    </div>

                    <div className="search-section">
                        <div className="search-pill-market">
                            <input 
                                type="text" 
                                placeholder="Search for Brands, Categories etc." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleSearch}
                            />
                            <Search 
                                size={18} 
                                color="#999" 
                                style={{ cursor: 'pointer' }}
                                onClick={handleSearch}
                            />
                        </div>
                    </div>

                    <div className="action-links">
                        {user && (
                            <Link to="/profile" className="icon-link" title="Profile">
                                <User size={24} />
                            </Link>
                        )}
                        <Link to="/cart" className="icon-link cart-icon">
                            <ShoppingBag size={24} />
                            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
