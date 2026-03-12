import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, ShoppingCart } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <div className="product-image">
                <img src={product.images[0]} alt={product.name} />
                <div className="product-overlay">
                    <Link to={`/product/${product.id}`} className="view-btn">
                        <Eye size={20} />
                    </Link>
                    <button className="cart-btn">
                        <ShoppingCart size={20} />
                    </button>
                </div>
            </div>

            <div className="product-info">
                <div className="product-category">{product.category}</div>
                <h3 className="product-name">{product.name}</h3>
                <p className="product-brand">by {product.brand}</p>
                <div className="product-price">₹{product.price}</div>
            </div>
        </div>
    );
};

export default ProductCard;
