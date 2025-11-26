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

export const productService = {
    getAllProducts,
    getProductById,
}