import axios from "axios";
import storage from "@/utils/storage";
import router from "../router";

// Set up Axios instance defaults
axios.defaults.baseURL = import.meta.env.VITE_WEB_URL + '/api';
axios.defaults.apiUrl = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;
axios.defaults.timeout = 120000;

// Request interceptor to add authorization headers
axios.interceptors.request.use(async (config) => {
  const token = await storage.get('token') || localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axios.interceptors.response.use((response)=>{
    return response;
}, 
(error)=> {
    if (error.response && error.response.status === 401) {
        console.warn('unauthorized, redirecting to login')
        router.push('/login')
    }
    return Promise.reject(error);
})

// Get data with dynamic payload
export const axiosGetDataWithPayload = async (endpoint, payload) => {
  try {
    const response = await axios.get(`/${endpoint}`, { params: payload });
    return response.data;
  } catch (e) {
    console.error(`Error getting data from ${endpoint}:`, e);
  }
};

// Post data to a specific endpoint
export const axiosPostData = async (endpoint, data) => {
  try {
    const response = await axios.post(`/${endpoint}`, data);
    return response.data;
  } catch (e) {
    console.error(`Error posting data to ${endpoint}:`, e);
  }
};

// Update data with PUT request
export const axiosPutData = async (endpoint, data) => {
  try {
    const response = await axios.put(`/${endpoint}`, data);
    return response.data;
  } catch (e) {
    console.error(`Error putting data to ${endpoint}:`, e);
  }
};

// Delete data from an endpoint with optional data ID
export const axiosDeleteData = async (endpoint, data) => {
  try {
    const url = data ? `/${endpoint}/${data.id}` : `/${endpoint}`;
    const response = await axios.delete(url);
    return response.data;
  } catch (e) {
    console.error(`Error deleting data from ${endpoint}:`, e);
  }
};

// Export Axios as a default export for convenience
export default axios;
