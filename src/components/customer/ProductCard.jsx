import React from 'react';
import { Link } from 'react-router-dom';
import './Customer.css';

const ProductCard = ({ product }) => {
    // Simulate some sale data for MarketNest feel
    const hasDiscount = true;
    const mrp = Math.floor(product.price * 1.5);
    const discount = 33;

    return (
        <Link to={`/products/${product.id}`} className="customer-product-card">
            <div className="card-image">
                <img src={product.images?.[0] || 'https://via.placeholder.com/300'} alt={product.name} />
            </div>
            <div className="card-info">
                <p className="brand-name">{product.brand?.name || 'MARKETNEST BRAND'}</p>
                <p className="product-name-market">{product.name}</p>
                <div className="price-container">
                    <span className="current-price">${product.price}</span>
                    <span className="original-price">${mrp}</span>
                    <span className="discount-tag">({discount}% OFF)</span>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
