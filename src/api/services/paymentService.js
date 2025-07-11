import axios from "axios";
import { API_CONFIG } from "../config/apiConfig";
import { ENDPOINTS } from "../constants/endPoints";




// fetching delivery type
export const fetchDeliveryTypeService = async () => {
    try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.FETCHDELIVERYTYPE}`);
        return response;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch product rating" };
    }
};




// post user address
export const postUserAddress = async (userToken, formData) => {
    try {
        const response = await axios.post(`${API_CONFIG.BASE_URL}${ENDPOINTS.SAVEUSERADDRESS}`,
            formData,
            {

                headers: {
                    "Authorization": `Bearer ${userToken}`,
                    "Content-Type": "application/json"
                }
            }
        );
        return response;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch product rating" };
    }
};

// place order api
export const placeOrderApi = async (formData, userToken) => {
    try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.PLACEORDER}`, {
            params: formData,  // ✅ Send data as query params
            headers: {
                "Authorization": `Bearer ${userToken}`,
                "Content-Type": "application/json"
            }
        });
        return response;
    } catch (error) {
        throw error.response?.data || { message: "Failed to place order" };
    }
};

// fetch payment type
export const fetchPaymentTypeApi = async () => {
    try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.FETCHPAYMENTYPE}`, {
            headers: {
                // "Authorization": `Bearer ${userToken}`,
                "Content-Type": "application/json"
            }
        });
        return response;
    } catch (error) {
        throw error.response?.data || { message: "Failed to place order" };
    }
};

// generate order id
// fetch payment type
export const generateOrderIdApi = async (userToken) => {
    try {
        const response = await axios.post(`${API_CONFIG.BASE_URL}${ENDPOINTS.GENERATEORDERID}`, {
            headers: {
                "Authorization": `Bearer ${userToken}`,
                "Content-Type": "application/json"
            }
        });
        return response;
    } catch (error) {
        throw error.response?.data || { message: "Failed to place order" };
    }
};

