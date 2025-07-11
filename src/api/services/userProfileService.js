
import axios from "axios";
import { API_CONFIG } from "../config/apiConfig";
import { ENDPOINTS } from "../constants/endPoints";




// fetching product rating
export const fetchUserAddress = async (userToken) => {
    try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.FETCHUSERADDRESS}`,
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


// fetch user all orders
export const fetchUserAllOrdersService = async (userToken) => {
    try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.FETCHALLORDERS}`,
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

// fetch sinlge order detail
export const fetchUserSingleOrdersService = async (userToken, formData) => {
    try {
        console.log(userToken, "---------------userToken---------------");

        const response = await axios.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.FETCHSINGLEORDERDETAIL}`, {
            params: formData, // ✅ Pass parameters in query string
            headers: {
                "Authorization": `Bearer ${userToken}`,
                "Content-Type": "application/json"
            }
        });

        return response;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch order details" };
    }
};


// track order
export const trackOrderService = async (userToken, formData) => {
    try {
        console.log(userToken, "---------------userToken---------------");

        const response = await axios.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.TRACKORDER}`, {
            params: formData,
            headers: {
                "Authorization": `Bearer ${userToken}`,
                "Content-Type": "application/json"
            }
        });

        return response;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch order details" };
    }
};


// fetching user wishlist
export const fetchUserWishlist = async (userToken) => {
    try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.FETCHUSERWISHLIST}`,
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

// fetching user supportr ticket
export const fetchUserSupportTicketService = async (userToken) => {
    try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.FETCHUSERSUPPORTTICKET}`,
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

// adding user ticket message
// fetching user supportr ticket
// export const addUserTicketMessageApi = async (userToken, ticket_id) => {
export const addUserTicketMessageApi = async (userToken, formData) => {
    try {
        // const response = await axios.post(`${API_CONFIG.BASE_URL}${ENDPOINTS.ADDUSERMESSAGE}/${ticket_id}`,
        alert("Hy")
        alert(userToken)
        const response = await axios.post(`${API_CONFIG.BASE_URL}${ENDPOINTS.ADDUSERMESSAGE}`,
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

// fetching user supportr ticket
export const fetchSingleSupportTicketService = async (id, userToken) => {
    try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.FETCHSINGLETICKET}/${id}`,
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

// fetching user address
export const fetchUserAddressService = async (userToken) => {
    // console.log(userToken, "---------------userToken---------------");
    try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.FETCHUSERADDRESS}`,
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

// update user information
export const updateUserInfomation = async (formData, userToken) => {
    try {
        const response = await axios.put(`${API_CONFIG.BASE_URL}${ENDPOINTS.UPDATEUSER}`,
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


// adding user new address
export const addUserAddressService = async (formData, userToken) => {
    try {
        const response = await axios.post(`${API_CONFIG.BASE_URL}${ENDPOINTS.ADDUSERADDRESS}`,
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

// update user new address
export const updateUserAddressService = async (formData, userToken) => {
    try {
        const response = await axios.put(`${API_CONFIG.BASE_URL}${ENDPOINTS.UPDATEADDRESS}`,
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

// delete user address
export const deleteUserAddressService = async (formData, userToken) => {
    try {
        const response = await axios.delete(`${API_CONFIG.BASE_URL}${ENDPOINTS.DELETEUSERADDRESS}`,
            {
                data: formData,
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

// add ticket
export const addUserTicketService = async (formData, userToken) => {
    try {
        const response = await axios.post(`${API_CONFIG.BASE_URL}${ENDPOINTS.ADDUSERTICKET}`,
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

// add ticket
export const deleteUserTicketService = async (id, userToken) => {
    try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.DELETETICKET}${id}`,
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

// fetching user info
export const fetchUserInfoService = async (userToken) => {
    try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.FETCHUSERINFO}`,
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

// download invoice
export const downloadInvoiceApi = async (formData, userToken) => {
    try {
        const response = await axios.post(`${API_CONFIG.BASE_URL}${ENDPOINTS.ADDUSERADDRESS}`,
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

// cancel order
export const cancelOrderApi = async (formData, userToken) => {
    try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.CANCELORDER}/?order_id=${formData.order_id}`,
            {
                headers: {
                    "Authorization": `Bearer ${userToken}`,
                    "Content-Type": "application/json"
                }
            }
        );
        return response;
    } catch (error) {
        throw error.response?.data || { message: "Failed to cancel order." };
    }
};




// user profile order search
export const userOrderSearchApi = async (formData, userToken) => {
    try {
        const response = await axios.post(`${API_CONFIG.BASE_URL}${ENDPOINTS.ADDUSERADDRESS}`,
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

