import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import orderService from '../services/orderService';
import toast from 'react-hot-toast';
import { MapPin, CreditCard, CheckCircle } from 'lucide-react';
import './Checkout.css';

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { items = [], total = 0, fromCart = false, buyNow = false } = location.state || {};
    const [placing, setPlacing] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [address, setAddress] = useState({
        street: '', city: '', state: '', zip: '', country: 'India',
    });

    if (!items.length && !orderPlaced) {
        return (
            <div className="checkout-page">
                <p>No items to checkout. <a href="/">Go shopping</a></p>
            </div>
        );
    }

    const handlePlaceOrder = async () => {
        if (!address.street || !address.city || !address.state || !address.zip) {
            toast.error('Please fill in all address fields');
            return;
        }
        setPlacing(true);
        try {
            const order = await orderService.createOrder({
                items: items.map(i => ({ product: i.product, quantity: i.quantity })),
                shippingAddress: address,
                fromCart,
            });
            setOrderPlaced(true);
            setOrderId(order._id);
            toast.success('Order placed successfully!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to place order');
        } finally {
            setPlacing(false);
        }
    };

    if (orderPlaced) {
        return (
            <div className="checkout-page">
                <div className="order-success">
                    <CheckCircle size={60} color="#27ae60" />
                    <h2>Order Confirmed!</h2>
                    <p>Order ID: <strong>#{orderId.slice(-8).toUpperCase()}</strong></p>
                    <p>Your order has been placed successfully. Thank you for shopping!</p>
                    <div className="success-actions">
                        <button className="btn-orders" onClick={() => navigate('/profile')}>My Orders</button>
                        <button className="btn-continue" onClick={() => navigate('/')}>Continue Shopping</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <h1 className="checkout-title">Checkout</h1>

            <div className="checkout-layout">
                <div className="checkout-form">
                    <div className="checkout-section">
                        <h3><MapPin size={20} /> Shipping Address</h3>
                        <div className="form-group">
                            <label>Street Address *</label>
                            <input value={address.street} onChange={e => setAddress({ ...address, street: e.target.value })} placeholder="123 Main Street" required />
                        </div>
                        <div className="form-row-checkout">
                            <div className="form-group">
                                <label>City *</label>
                                <input value={address.city} onChange={e => setAddress({ ...address, city: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>State *</label>
                                <input value={address.state} onChange={e => setAddress({ ...address, state: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>ZIP Code *</label>
                                <input value={address.zip} onChange={e => setAddress({ ...address, zip: e.target.value })} required />
                            </div>
                        </div>
                    </div>

                    <div className="checkout-section">
                        <h3><CreditCard size={20} /> Payment</h3>
                        <div className="payment-method">
                            <input type="radio" checked readOnly id="cod" />
                            <label htmlFor="cod">Cash on Delivery (COD)</label>
                        </div>
                    </div>
                </div>

                <div className="order-review">
                    <h3>Order Review</h3>
                    <div className="review-items">
                        {items.map((item, i) => (
                            <div key={i} className="review-item">
                                {item.image && <img src={item.image} alt={item.name} />}
                                <div>
                                    <p className="review-name">{item.name}</p>
                                    <p className="review-qty">Qty: {item.quantity}</p>
                                </div>
                                <p className="review-price">₹{(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                    <div className="review-divider"></div>
                    <div className="review-total">
                        <span>Total</span>
                        <span>₹{total.toFixed(2)}</span>
                    </div>
                    <button className="btn-place-order" onClick={handlePlaceOrder} disabled={placing}>
                        {placing ? 'Placing Order...' : 'Place Order'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
