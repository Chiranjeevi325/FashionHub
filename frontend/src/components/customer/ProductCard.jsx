import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './Customer.css';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const { user } = useAuth();

    const hasDiscount = true;
    const mrp = Math.floor(product.price * 1.5);
    const discount = 33;

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product._id, 1);
    };

    return (
        <Link to={`/products/${product._id}`} className="customer-product-card">
            <div className="card-image">
                <img src={product.images?.[0] || 'https://via.placeholder.com/300'} alt={product.name} />
                {user?.role === 'customer' && (
                    <button className="quick-add-btn" onClick={handleAddToCart} title="Add to Cart">
                        <ShoppingCart size={16} />
                    </button>
                )}
            </div>
            <div className="card-info">
                <p className="brand-name">{product.brand?.name || 'MARKETNEST BRAND'}</p>
                <p className="product-name-market">{product.name}</p>
                <div className="price-container">
                    <span className="current-price">₹{product.price}</span>
                    <span className="original-price">₹{mrp}</span>
                    <span className="discount-tag">({discount}% OFF)</span>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
