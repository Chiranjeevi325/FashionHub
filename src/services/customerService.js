import axiosInstance from '../config/axios';

const customerService = {
    getProducts: async (params) => {
        const response = await axiosInstance.get('/products', { params });
        return response.data;
    },

    getProductById: async (id) => {
        const response = await axiosInstance.get(`/products/${id}`);
        return response.data;
    },

    getCategories: async () => {
        const response = await axiosInstance.get('/categories');
        return response.data;
    }
};

export default customerService;
