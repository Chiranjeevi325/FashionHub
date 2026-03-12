import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../../hooks/useProducts';
import ProductCard from '../../components/customer/ProductCard';
import Pagination from '../../components/customer/Pagination';
import './Marketplace.css';

const Marketplace = ({ defaultCategory = 'All' }) => {
    const [searchParams] = useSearchParams();
    const [filters, setFilters] = useState({
        page: 1,
        search: searchParams.get('search') || '',
        category: defaultCategory,
        limit: 16 // Dense grid
    });

    const { products, loading, pagination } = useProducts(filters);

    // Sync filters when defaultCategory prop or search param changes
    React.useEffect(() => {
        setFilters(prev => ({ 
            ...prev, 
            category: defaultCategory, 
            search: searchParams.get('search') || '',
            page: 1 
        }));
    }, [defaultCategory, searchParams]);

    const handlePageChange = (newPage) => {
        setFilters(prev => ({ ...prev, page: newPage }));
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const scrollToProducts = () => {
        const productSection = document.getElementById('products-listing');
        if (productSection) {
            productSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <main className="marketplace-container container">
            {/* Premium Style Hero Banners */}
            <section className="market-hero-section">
                <div className="promo-banner">
                    <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2070" alt="Main Promo" />
                    <div className="promo-content">
                        <h1>SEASON'S BEST</h1>
                        <p>Min. 50% Off on Global Brands</p>
                        <button className="btn-pill" onClick={scrollToProducts}>SHOP NOW</button>
                    </div>
                </div>
            </section>

            {/* Marketplace Category Spotlight */}
            <section className="category-spotlight" style={{ marginBottom: '4rem', textAlign: 'center' }}>
                <h3 style={{ textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '2rem', fontWeight: 800 }}>Shop By Category</h3>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem' }}>
                    {['Men', 'Women', 'Kids'].map(cat => (
                        <div key={cat} style={{ cursor: 'pointer' }}>
                            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: '#eee', marginBottom: '1rem', overflow: 'hidden' }}>
                                <img src={`https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=200`} alt={cat} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <span style={{ fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase' }}>{cat}</span>
                        </div>
                    ))}
                </div>
            </section>

            <header id="products-listing" className="market-marketplace-header">
                <h2>{filters.category === 'All' ? 'ALL PRODUCTS' : filters.category.toUpperCase()}</h2>
                <div className="results-info">
                    {pagination.total} Items Found
                </div>
            </header>

            {loading ? (
                <div className="loading-market">DISCOVERING STYLE...</div>
            ) : (
                <>
                    <div className="product-grid-market">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    <div className="pagination-market">
                        <Pagination
                            current={pagination.current}
                            total={pagination.pages}
                            onChange={handlePageChange}
                        />
                    </div>
                </>
            )}
        </main>
    );
};

export default Marketplace;
