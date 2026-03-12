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
                <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
                    {['Men', 'Women', 'Kids'].map(cat => (
                        <div 
                            key={cat} 
                            className={`category-item-circle ${filters.category === cat ? 'active' : ''}`}
                            onClick={() => setFilters(prev => ({ ...prev, category: cat, page: 1 }))}
                        >
                            <div className="circle-img-wrapper">
                                <img 
                                    src={cat === 'Men' ? 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?auto=format&fit=crop&q=80&w=200' : 
                                         cat === 'Women' ? 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=200' : 
                                         'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&q=80&w=200'} 
                                    alt={cat} 
                                />
                            </div>
                            <span className="category-label">{cat}</span>
                        </div>
                    ))}
                    <div 
                        className={`category-item-circle ${filters.category === 'All' ? 'active' : ''}`}
                        onClick={() => setFilters(prev => ({ ...prev, category: 'All', page: 1 }))}
                    >
                        <div className="circle-img-wrapper">
                            <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=200" alt="All" />
                        </div>
                        <span className="category-label">All</span>
                    </div>
                </div>
            </section>

            <header id="products-listing" className="market-marketplace-header">
                <div className="header-left">
                    <h2>{filters.category === 'All' ? 'ALL PRODUCTS' : filters.category.toUpperCase()}</h2>
                    <div className="results-info">
                        {pagination.total} Items Found
                    </div>
                </div>
                
                <div className="header-right">
                    <select 
                        className="sort-select"
                        value={filters.sort || ''}
                        onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value, page: 1 }))}
                    >
                        <option value="">Sort By: Newest</option>
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                    </select>
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
