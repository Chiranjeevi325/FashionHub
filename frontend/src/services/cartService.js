import axiosInstance from '../config/axios';

const cartService = {
    getCart: async () => {
        const response = await axiosInstance.get('/cart');
        return response.data;
    },

    addToCart: async (productId, quantity = 1) => {
        const response = await axiosInstance.post('/cart', { productId, quantity });
        return response.data;
    },

    updateQuantity: async (itemId, quantity) => {
        const response = await axiosInstance.put(`/cart/${itemId}`, { quantity });
        return response.data;
    },

    removeFromCart: async (itemId) => {
        const response = await axiosInstance.delete(`/cart/${itemId}`);
        return response.data;
    },

    clearCart: async () => {
        const response = await axiosInstance.delete('/cart');
        return response.data;
    },
};

export default cartService;
