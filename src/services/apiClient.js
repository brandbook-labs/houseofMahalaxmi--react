import axios from 'axios';

// ଆପଣଙ୍କ ବ୍ୟାକେଣ୍ଡ୍ URL (ଏହାକୁ .env ଫାଇଲ୍‌ରେ ରଖିବା ସବୁଠାରୁ ଭଲ)
const BASE_URL = 'http://localhost:3005/api/v1';

const apiClient = axios.create({
    baseURL: BASE_URL,
});

// Request Interceptor: ଏହା ପ୍ରତ୍ୟେକ API କଲ୍ ପୂର୍ବରୁ ଅଟୋମେଟିକ୍ ରନ୍ ହେବ
apiClient.interceptors.request.use(
    (config) => {
        // LocalStorage ରୁ ଟୋକେନ୍ ଆଣନ୍ତୁ
        const token = localStorage.getItem('adminToken'); // ଆପଣଙ୍କ ଟୋକେନ୍ ର ନାମ
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;