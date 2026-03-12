import React from 'react';

const CATEGORIES = ['All', 'Clothing', 'Shoes', 'Accessories', 'Bags', 'Jewelry'];

const CategoryFilter = ({ activeCategory, onChange }) => {
    return (
        <div className="market-category-filter" style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => (
                <button
                    key={cat}
                    className={`btn-pill ${activeCategory === cat ? 'active' : 'outline'}`}
                    onClick={() => onChange(cat)}
                    style={{
                        padding: '0.6rem 1.5rem',
                        fontSize: '0.75rem',
                        background: activeCategory === cat ? 'var(--primary)' : 'transparent',
                        color: activeCategory === cat ? '#FFF' : '#333',
                        border: activeCategory === cat ? 'none' : '1px solid #ccc',
                        borderRadius: 'var(--radius-pill)',
                        fontWeight: '700'
                    }}
                >
                    {cat.toUpperCase()}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
