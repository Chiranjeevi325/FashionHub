export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const USER_ROLES = {
    BRAND: 'brand',
    CUSTOMER: 'customer'
};

export const PRODUCT_STATUS = {
    DRAFT: 'draft',
    PUBLISHED: 'published',
    ARCHIVED: 'archived'
};

export const STORAGE_KEYS = {
    USER: 'marketnest_user',
    TOKEN: 'marketnest_token'
};
