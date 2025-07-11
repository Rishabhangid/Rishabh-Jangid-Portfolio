import axios from "axios";
import { API_CONFIG } from "../config/apiConfig";
import { ENDPOINTS } from "../constants/endPoints";

// fetching all banners
export const fetchAllBanners = async () => {
    try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.FETCHALLBANNERS}`);
        return response;
    } catch (error) {
        throw error.response?.data || { message: "Registration failed" };
    }
};


// fetching all products catagory
export const fetchAllCatagories = async () => {
    try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.FETCHINGALLCATAGORY}`);
        return response;
    } catch (error) {
        throw error.response?.data || { message: "Product catagory fetching failed" };
    }
};

// fetching trending / top rated products
export const fetchTrendingProducts = async () => {
    try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.FETCHTRENDINGPRODUCT}`);
        return response;
    } catch (error) {
        throw error.response?.data || { message: "Trendig products  fetched failed" };
    }
};


// fetching product rating
export const fetchLatestProducts = async () => {
    try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.FETCHLATESTPRODUCT}`);
        return response;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch product rating" };
    }
};

// fetching search products
export const fetchSearchProducts = async (search) => {
    try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.SEARCHPRODUCTS}?name=${search}`);
        return response;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch product rating" };
    }
};

// navbar search products
export const searchProducts = async (search) => {
    try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.HEADERSEARCH}?name=${search}&limit=${50}&offset=${1}`);
        return response;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch product rating" };
    }
};



