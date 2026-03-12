import React, { createContext, useContext, useState, useEffect } from 'react';
import cartService from '../services/cartService';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user, accessToken } = useAuth();
    const [cart, setCart] = useState({ items: [] });
    const [loading, setLoading] = useState(false);

    const itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);

    const fetchCart = async () => {
        if (!user || !accessToken) return;
        try {
            setLoading(true);
            const data = await cartService.getCart();
            setCart(data);
        } catch (error) {
            console.error('Failed to load cart:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && accessToken && user.role === 'customer') {
            fetchCart();
        }
    }, [user, accessToken]);

    const addToCart = async (productId, quantity = 1) => {
        if (!user) {
            toast.error('Please login to add items to cart');
            return;
        }
        try {
            const data = await cartService.addToCart(productId, quantity);
            setCart(data);
            toast.success('Added to cart!');
        } catch (error) {
            toast.error('Failed to add to cart');
        }
    };

    const updateQuantity = async (itemId, quantity) => {
        try {
            const data = await cartService.updateQuantity(itemId, quantity);
            setCart(data);
        } catch (error) {
            toast.error('Failed to update quantity');
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            const data = await cartService.removeFromCart(itemId);
            setCart(data);
            toast.success('Removed from cart');
        } catch (error) {
            toast.error('Failed to remove item');
        }
    };

    const clearCart = async () => {
        try {
            await cartService.clearCart();
            setCart({ items: [] });
        } catch (error) {
            console.error('Failed to clear cart');
        }
    };

    return (
        <CartContext.Provider value={{ cart, itemCount, loading, addToCart, updateQuantity, removeFromCart, clearCart, fetchCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
