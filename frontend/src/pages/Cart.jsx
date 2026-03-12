import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import './Cart.css';

const Cart = () => {
    const { cart, itemCount, updateQuantity, removeFromCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    if (!user) {
        return (
            <div className="cart-page">
                <div className="cart-empty">
                    <ShoppingBag size={50} />
                    <h2>Please login to view your cart</h2>
                    <Link to="/login" className="btn-shop">Login</Link>
                </div>
            </div>
        );
    }

    if (!cart.items || cart.items.length === 0) {
        return (
            <div className="cart-page">
                <div className="cart-empty">
                    <ShoppingBag size={50} />
                    <h2>Your cart is empty</h2>
                    <p>Add items to your cart to see them here.</p>
                    <Link to="/" className="btn-shop">Continue Shopping</Link>
                </div>
            </div>
        );
    }

    const subtotal = cart.items.reduce((sum, item) => {
        return sum + (item.product?.price || 0) * item.quantity;
    }, 0);

    const handleCheckout = () => {
        const items = cart.items.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            name: item.product.name,
            price: item.product.price,
            image: item.product.images?.[0],
        }));
        navigate('/checkout', { state: { items, total: subtotal, fromCart: true } });
    };

    return (
        <div className="cart-page">
            <h1 className="cart-title">Shopping Cart ({itemCount} items)</h1>

            <div className="cart-layout">
                <div className="cart-items">
                    {cart.items.map(item => (
                        <div key={item._id} className="cart-item">
                            <img src={item.product?.images?.[0] || 'https://via.placeholder.com/100'} alt={item.product?.name} />
                            <div className="item-details">
                                <h3>{item.product?.name}</h3>
                                <p className="item-category">{item.product?.category}</p>
                                <p className="item-price">₹{item.product?.price?.toFixed(2)}</p>
                            </div>
                            <div className="item-quantity">
                                <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>
                                    <Minus size={16} />
                                </button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
                                    <Plus size={16} />
                                </button>
                            </div>
                            <p className="item-total">₹{(item.product?.price * item.quantity).toFixed(2)}</p>
                            <button className="remove-btn" onClick={() => removeFromCart(item._id)}>
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h3>Order Summary</h3>
                    <div className="summary-row"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
                    <div className="summary-row"><span>Shipping</span><span className="free">FREE</span></div>
                    <div className="summary-divider"></div>
                    <div className="summary-row total"><span>Total</span><span>₹{subtotal.toFixed(2)}</span></div>
                    <button className="btn-checkout" onClick={handleCheckout}>
                        Proceed to Checkout <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
