import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5000/',
    timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * @param {string} url
 * @param {'GET'|'POST'|'PUT'|'DELETE'|'PATCH'} method
 * @param {any} [data]
 * @returns {Promise<any>}
 */
export const apiRequest = async (url, method, data) => {
    const response = await apiClient({
        url,
        method,
        data,
    });
    return response.data;
};