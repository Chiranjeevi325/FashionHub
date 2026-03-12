import React, { useState, useMemo } from 'react';
import { MOCK_PRODUCTS, CATEGORIES } from '../../mock/data';
import ProductCard from '../../components/ProductCard';
import { Filter, Search as SearchIcon, ArrowDownWideArrow } from 'lucide-react';
import './Marketplace.css';

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('newest');

    const filteredProducts = useMemo(() => {
        return MOCK_PRODUCTS.filter(product => {
            const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.brand.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch && !product.isDeleted && product.status === 'published';
        }).sort((a, b) => {
            if (sortBy === 'price-low') return a.price - b.price;
            if (sortBy === 'price-high') return b.price - a.price;
            return 0; // Default: newest (mocked)
        });
    }, [selectedCategory, searchQuery, sortBy]);

    return (
        <div className="marketplace-page">
            <section className="hero-section">
                <div className="container hero-content">
                    <h1 className="text-gradient">Elevate Your Style</h1>
                    <p>Discover exclusive pieces from luxury brands around the world.</p>
                </div>
            </section>

            <div className="container main-content">
                <aside className="filters-sidebar desktop-only">
                    <h3>Categories</h3>
                    <ul className="category-list">
                        {CATEGORIES.map(cat => (
                            <li
                                key={cat}
                                className={selectedCategory === cat ? 'active' : ''}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </li>
                        ))}
                    </ul>
                </aside>

                <main className="marketplace-grid-container">
                    <div className="grid-header">
                        <div className="results-count">
                            Showing {filteredProducts.length} results
                        </div>
                        <div className="grid-controls">
                            <div className="search-input-wrapper">
                                <SearchIcon size={18} />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
                                <option value="newest">Newest First</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                        </div>
                    </div>

                    <div className="product-grid">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                        {filteredProducts.length === 0 && (
                            <div className="no-results">
                                <h3>No products found</h3>
                                <p>Try adjusting your search or filters</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Home;
