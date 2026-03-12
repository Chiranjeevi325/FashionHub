import React from 'react';
import './Layout.css';

const Footer = () => {
    return (
        <footer className="market-footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-col">
                        <h4>MarketNest</h4>
                        <ul className="footer-links">
                            <li><a href="#">Who We Are</a></li>
                            <li><a href="#">Join Our Team</a></li>
                            <li><a href="#">Terms & Conditions</a></li>
                            <li><a href="#">We Respect Your Privacy</a></li>
                            <li><a href="#">Fees & Payments</a></li>
                            <li><a href="#">Returns & Refunds Policy</a></li>
                            <li><a href="#">Promotions Terms & Conditions</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Help</h4>
                        <ul className="footer-links">
                            <li><a href="#">Track Your Order</a></li>
                            <li><a href="#">Frequently Asked Questions</a></li>
                            <li><a href="#">Returns</a></li>
                            <li><a href="#">Cancellations</a></li>
                            <li><a href="#">Payments</a></li>
                            <li><a href="#">Customer Care</a></li>
                            <li><a href="#">How Do I Redeem My Coupon</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Shop by</h4>
                        <ul className="footer-links">
                            <li><a href="#">Men</a></li>
                            <li><a href="#">Women</a></li>
                            <li><a href="#">Kids</a></li>
                            <li><a href="#">New Arrivals</a></li>
                            <li><a href="#">Brand Directory</a></li>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Collections</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Follow us</h4>
                        <ul className="footer-links">
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">Instagram- MarketNest</a></li>
                            <li><a href="#">Instagram- MarketNest LUXE</a></li>
                            <li><a href="#">Twitter</a></li>
                            <li><a href="#">Pinterest</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom-tier">
                    <div className="payment-methods">
                        <span>Payment Methods:</span>
                        {/* Placeholder for payment icons */}
                        <span>Net Banking | Visa | Mastercard | Cash On Delivery | Digital Wallets</span>
                    </div>
                    <p className="copyright">&copy; 2026 MarketNest. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
