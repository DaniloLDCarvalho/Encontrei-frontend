import { apiRequest } from '@/lib/apiClient';
import { ProductDto } from '@/types/product/ProductDto';

const API_URL = '/products'

/**
 * Fetch all products from the API.
 * @returns {Promise<ProductDto[]>}
 */
const getAllProducts = async () => {
    return apiRequest(API_URL, 'GET');
}

/**
 * Fetch a product by its ID from the API.
 * @param id
 * @returns {Promise<ProductDto>}
 */
const getProductById = async (id) => {
    return apiRequest(`${API_URL}/${id}`, 'GET');
}

const createProduct = async (productData) => {
    return apiRequest(API_URL, 'POST', productData);
}

const updateProduct = async (id, productData) => {
    return apiRequest(`${API_URL}/${id}`, 'PUT', productData);
}

const deleteProduct = async (id) => {
   return apiRequest(`${API_URL}/${id}`, 'DELETE');
}

export const productService = {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct
}