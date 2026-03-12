import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import customerService from '../../services/customerService';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import orderService from '../../services/orderService';
import toast from 'react-hot-toast';
import { ShoppingCart, Zap, ChevronLeft, Star } from 'lucide-react';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { user } = useAuth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [buying, setBuying] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await customerService.getProductById(id);
                setProduct(data);
            } catch (err) {
                toast.error('Product not found');
                navigate('/');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (!user) {
            toast.error('Please login to add items to cart');
            return navigate('/login');
        }
        addToCart(product._id, quantity);
    };

    const handleBuyNow = async () => {
        if (!user) {
            toast.error('Please login to buy');
            return navigate('/login');
        }
        navigate('/checkout', {
            state: {
                items: [{ product: product._id, quantity, name: product.name, price: product.price, image: product.images?.[0] }],
                total: product.price * quantity,
                buyNow: true,
            }
        });
    };

    if (loading) return <div className="product-detail-page"><p>Loading...</p></div>;
    if (!product) return <div className="product-detail-page"><p>Product not found</p></div>;

    const mrp = Math.floor(product.price * 1.5);
    const discount = Math.round(((mrp - product.price) / mrp) * 100);

    return (
        <div className="product-detail-page">
            <button className="back-btn" onClick={() => navigate(-1)}>
                <ChevronLeft size={20} /> Back
            </button>

            <div className="product-detail-grid">
                <div className="image-section">
                    <div className="main-image">
                        <img src={product.images?.[selectedImage] || 'https://via.placeholder.com/500'} alt={product.name} />
                    </div>
                    {product.images?.length > 1 && (
                        <div className="image-thumbnails">
                            {product.images.map((img, i) => (
                                <img
                                    key={i}
                                    src={img}
                                    alt={`${product.name} ${i + 1}`}
                                    className={i === selectedImage ? 'active' : ''}
                                    onClick={() => setSelectedImage(i)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className="info-section">
                    <p className="brand-label">{product.brand?.name || 'FASHIONHUB OFFICIAL'}</p>
                    <h1 className="product-title">{product.name}</h1>

                    <div className="rating-row">
                        <div className="stars">
                            {[1,2,3,4,5].map(s => <Star key={s} size={16} fill={s <= 4 ? '#ffc107' : 'none'} stroke="#ffc107" />)}
                        </div>
                        <span className="rating-count">4.0 (128 reviews)</span>
                    </div>

                    <div className="price-section">
                        <span className="detail-price">₹{product.price}</span>
                        <span className="detail-mrp">₹{mrp}</span>
                        <span className="detail-discount">{discount}% OFF</span>
                    </div>

                    <p className="tax-info">inclusive of all taxes</p>

                    <div className="description-section">
                        <h3>Description</h3>
                        <p>{product.description}</p>
                    </div>

                    <div className="category-tag">
                        Category: <span>{product.category}</span>
                    </div>

                    <div className="quantity-section">
                        <label>Qty:</label>
                        <div className="qty-controls">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                            <span>{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button className="btn-add-cart" onClick={handleAddToCart}>
                            <ShoppingCart size={20} /> ADD TO CART
                        </button>
                        <button className="btn-buy-now" onClick={handleBuyNow} disabled={buying}>
                            <Zap size={20} /> BUY NOW
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
