
import axios from "axios";
import { API_CONFIG } from "../config/apiConfig";
import { ENDPOINTS } from "../constants/endPoints";



// fetching product by catagory id
export const fetchProductById = async (id) => {
    try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.FETCHINGPRODUCTBYCATAGORYID}${id}`);
        return response;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch product catagories" };
    }
};

// fetching product rating
export const fetchFeaturedProducts = async () => {
    try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.FETCHBESTSELLINGPRODUCT}`);
        return response;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch product rating" };
    }
};

// fetch all brand
export const fetchAllBrands = async () => {
    try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.FETCHALLBRANDS}`);
        return response;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch all brands" };
    }
};

// filter bar 
export const filterService = async (filters) => {
    try {
        const { id, sortBy, minPrice, maxPrice, brand, category } = filters;

        // Constructing API URL dynamically based on filters
        const response = await axios.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.FILTERAPI}`, {
            params: {
                id: id || 1,  // Default to 1 if not provided
                // data_from: "brand",
                // sort_by: sortBy || "",
                data_from: sortBy || "",
                min_price: minPrice || "",
                max_price: maxPrice || "",
                brand: brand || "",
                category: category || "",
                page: 1,
            },
        });

        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch filtered products" };
    }
};









  
