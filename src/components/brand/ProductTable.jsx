import React, { useState, useEffect } from 'react';
import brandService from '../../services/brandService';
import { Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductTable = ({ limit }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await brandService.getProducts({ limit });
                setProducts(data.products || []);
            } catch (error) {
                console.warn('Listing products fallback');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [limit]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await brandService.deleteProduct(id);
                setProducts(products.filter(p => p.id !== id));
                toast.success('Product deleted successfully');
            } catch (err) {
                toast.error('Failed to delete product');
            }
        }
    };

    if (loading) return <div>Loading products...</div>;

    return (
        <table className="products-table">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map(product => (
                    <tr key={product.id}>
                        <td>
                            <div className="product-cell">
                                <img src={product.images?.[0] || 'https://via.placeholder.com/50'} alt="" />
                                <span>{product.name}</span>
                            </div>
                        </td>
                        <td>₹{product.price}</td>
                        <td><span className={`badge ${product.status}`}>{product.status}</span></td>
                        <td className="actions">
                            <button className="icon-btn edit"><Edit2 size={16} /></button>
                            <button className="icon-btn delete" onClick={() => handleDelete(product.id)}><Trash2 size={16} /></button>
                        </td>
                    </tr>
                ))}
                {products.length === 0 && (
                    <tr><td colSpan="4" className="text-center">No products found.</td></tr>
                )}
            </tbody>
        </table>
    );
};

export default ProductTable;
