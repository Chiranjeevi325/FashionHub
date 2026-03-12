import React from 'react';
import { Link } from 'react-router-dom';
import './Layout.css';

const Footer = () => {
    return (
        <footer className="market-footer">
            <div className="container">
                <div className="footer-content-optimized">
                    <Link to="/" className="market-logo footer-logo">
                        MARKET<span>NEST</span>
                    </Link>
                    
                    <ul className="footer-nav-minimal">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/men">Men</Link></li>
                        <li><Link to="/women">Women</Link></li>
                        <li><Link to="/kids">Kids</Link></li>
                    </ul>
                </div>

                <div className="footer-bottom-tier">
                    <p className="copyright">&copy; 2026 MarketNest. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
