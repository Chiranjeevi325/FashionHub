import axiosInstance from '../config/axios';

const authService = {
    login: async (credentials) => {
        const response = await axiosInstance.post('/auth/login', credentials);
        return response.data;
    },

    signup: async (userData) => {
        const response = await axiosInstance.post('/auth/signup', userData);
        return response.data;
    },

    logout: async () => {
        const response = await axiosInstance.post('/auth/logout');
        return response.data;
    },

    refreshToken: async () => {
        const response = await axiosInstance.post('/auth/refresh');
        return response.data;
    },

    getProfile: async () => {
        const response = await axiosInstance.get('/auth/profile');
        return response.data;
    },

    updateProfile: async (data) => {
        const response = await axiosInstance.put('/auth/profile', data);
        return response.data;
    }
};

export default authService;
