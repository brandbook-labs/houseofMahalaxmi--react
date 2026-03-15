import apiClient from './apiClient';

// ───────────── ADMIN ENDPOINTS ─────────────

export const loginAdmin = async (credentials) => {
    const response = await apiClient.post('/admin/login', credentials);
    return response.data;
};

// ───────────── PRODUCT ENDPOINTS ─────────────

export const getAllProducts = async (filters = {}) => {
    try {
        const response = await apiClient.get('/products', { params: filters });
        
        // ସର୍ଭର୍ ଯଦି success (200) ଦିଏ, ତେବେ ସିଧାସଳଖ ଭିତରର 'data' କୁ ରିଟର୍ଣ୍ଣ କରନ୍ତୁ
        if (response.data.code === 200) {
            return response.data.data; // ଏଥିରେ products ଏବଂ pagination ଅଛି
        }
        return null;
    } catch (error) {
        console.error("API Error in getAllProducts:", error);
        return null;
    }
};

export const getProductById = async (slug) => {
    const response = await apiClient.get(`/products/${slug}`);
    return response.data.data;
};

// [NEW] ନୂଆ ପ୍ରଡକ୍ଟ ଆଡ୍ କରିବା (FormData ବ୍ୟବହାର କରି କାରଣ ଇମେଜ୍ ଅଛି)
export const createProduct = async (productFormData) => {
    const response = await apiClient.post('/products', productFormData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await apiClient.delete(`/products/${id}`);
    return response.data;
};