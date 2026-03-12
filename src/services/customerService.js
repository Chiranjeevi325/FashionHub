import axiosInstance from '../config/axios';

const customerService = {
    getProducts: async (params) => {
        const response = await axiosInstance.get('/customer/products', { params });
        return response.data;
    },

    getProductById: async (id) => {
        const response = await axiosInstance.get(`/customer/products/${id}`);
        return response.data;
    },

    getCategories: async () => {
        const response = await axiosInstance.get('/customer/categories');
        return response.data;
    }
};

export default customerService;
