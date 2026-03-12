import { useState, useEffect } from 'react';
import customerService from '../services/customerService';
import toast from 'react-hot-toast';

export const useProducts = (filters = {}) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({ total: 0, pages: 0, current: 1 });

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data = await customerService.getProducts(filters);
            setProducts(data.products || []);
            setPagination(data.pagination || { total: 0, pages: 0, current: 1 });
        } catch (err) {
            toast.error('Failed to load products');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [JSON.stringify(filters)]);

    return { products, loading, pagination, refetch: fetchProducts };
};
