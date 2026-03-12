import axiosInstance from '../config/axios';

const brandService = {
    getStats: async () => {
        const response = await axiosInstance.get('/brand/stats');
        return response.data;
    },

    getProducts: async (params) => {
        const response = await axiosInstance.get('/brand/products', { params });
        return response.data;
    },

    createProduct: async (productData) => {
        const response = await axiosInstance.post('/brand/products', productData);
        return response.data;
    },

    updateProduct: async (id, productData) => {
        const response = await axiosInstance.put(`/brand/products/${id}`, productData);
        return response.data;
    },

    deleteProduct: async (id) => {
        const response = await axiosInstance.delete(`/brand/products/${id}`);
        return response.data;
    },

    uploadImages: async (formData) => {
        const response = await axiosInstance.post('/brand/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    }
};

export default brandService;
