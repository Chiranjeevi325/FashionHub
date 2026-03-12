import React from 'react';
import ProductTable from '../../components/brand/ProductTable';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import './Dashboard.css';

const Products = () => {
    return (
        <div className="brand-dashboard">
            <header className="dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1>My Products</h1>
                    <p>Manage your brand's product inventory.</p>
                </div>
                <Link to="/dashboard/products/create" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <PlusCircle size={18} /> Add Product
                </Link>
            </header>

            <div className="recent-activity glass">
                <ProductTable limit={50} />
            </div>
        </div>
    );
};

export default Products;
