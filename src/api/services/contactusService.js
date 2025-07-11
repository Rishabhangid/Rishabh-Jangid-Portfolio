import axios from "axios";
import { API_CONFIG } from "../config/apiConfig";
import { ENDPOINTS } from "../constants/endPoints";

// sending contact message
export const sendContact = async (formData) => {
    try {
        const response = await axios.post(`${API_CONFIG.BASE_URL}${ENDPOINTS.POSTCONTACTMESSAGE}`, formData);
        return response;
    } catch (error) {
        throw error.response?.data || { message: "Registration failed" };
    }
};


