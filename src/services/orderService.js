import axiosInstance from '../config/axios';

const orderService = {
    createOrder: async (orderData) => {
        const response = await axiosInstance.post('/orders', orderData);
        return response.data;
    },

    getOrders: async () => {
        const response = await axiosInstance.get('/orders');
        return response.data;
    },

    getOrderById: async (id) => {
        const response = await axiosInstance.get(`/orders/${id}`);
        return response.data;
    },
};

export default orderService;
