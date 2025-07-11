
import axios from "axios";
import { API_CONFIG } from "../config/apiConfig";
import { ENDPOINTS } from "../constants/endPoints";



// fetching product rating
export const fetchProductRatingOnly = async (id) => {
    try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.FETCHPRODUCTRATING}${id}`);
        return response;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch product rating" };
    }
};

// fetching product all detail
export const fetchProductAllDetail = async (id) => {
    try {
        console.log(id, "---------------id from service---------------");
        const response = await axios.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.FETCHSINGLEPRODUCTDETAIL}${id}`);
        return response;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch product rating" };
    }
};

// fetching product all detail
export const fetchProductOrdersApi = async (id) => {
    try {
        // console.log(id, "---------------id from service ++++++++++++++++++++++++++++---------------");
        const response = await axios.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.FETCHPRODUCTTOTALORDER}${id}`);
        // console.log(response, "---------------response---------------");
        return response;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch product rating" };
    }
};

// fetching product all detail
export const fetchProductReviewsApi = async (id) => {
    try {
        console.log(id, "---------------id from service revies ++++++++++++  rr  ++++++++++++++++---------------");
        console.log(API_CONFIG.BASE_URLENDPOINTS.FETCHPRODUCTREVIEWSid, "---------------API_CONFIG.BASE_URLENDPOINTS.FETCHPRODUCTREVIEWSid---------------");
        const response = await axios.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.FETCHPRODUCTREVIEWS}${id}`);
        console.log(response, "---------------response FROM CONFIG ^^---------------");
        return response;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch product reviews" };
    }
};

// fetching product all detail
export const fetchRelatedProductById = async (id) => {
    try {
        console.log(id, "---------------id from service---------------");
        const response = await axios.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.FETCHRELATED}/${id}`);
        return response;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch product rating" };
    }
};


// adding product to wishlist
export const addProductToWishlistService = async (formData, userToken) => {
    try {
        console.log(formData, "---------------product_id from service---------------");
        const response = await axios.post(`${API_CONFIG.BASE_URL}${ENDPOINTS.ADDTOWISHLIST}`,
            formData,
            {
                headers: {
                    "Authorization": `Bearer ${userToken}`,
                    "Content-Type": "application/json"
                }
            });
        return response;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch product rating" };
    }
};

// remove product from wishlist
export const removeFromWishlistService = async (formData, userToken) => {
    try {
        console.log(formData, "---------------product_id from service ###############---------------");
        console.log(userToken, "---------------userToken fromrfomormomormo---------------");
        const response = await axios.delete(`${API_CONFIG.BASE_URL}${ENDPOINTS.REMOVEFROMWISHLIST}`,

            {
                data: formData,
                headers: {
                    "Authorization": `Bearer ${userToken}`,
                    "Content-Type": "application/json"
                }
            });
        return response;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch product rating" };
    }
};

// add comment api
export const addCommentApi = async (formData, userToken) => {
    try {
        console.log(formData, "---------------product_id from service ###############---------------");
        console.log(userToken, "---------------userToken fromrfomormomormo---------------");
        const response = await axios.post(`${API_CONFIG.BASE_URL}${ENDPOINTS.ADDCOMMENT}`,
            formData,
            {

                headers: {
                    "Authorization": `Bearer ${userToken}`,
                    "Content-Type": "application/json"
                }
            });
        return response;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch product rating" };
    }
};

// fetch user wishlist
export const fetchUserWishlistApi = async (userToken) => {
    try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.FETCHUSERWISHLIST}`,
            {
                headers: {
                    "Authorization": `Bearer ${userToken}`,
                    "Content-Type": "application/json"
                }
            });
        return response;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch product rating" };
    }
};


// add to cart
export const addToCartService = async (formData, userToken) => {
    try {
        console.log(formData, "---------------product_id from service---------------");
        const response = await axios.post(`${API_CONFIG.BASE_URL}${ENDPOINTS.ADDTOCART}`,
            formData,
            {
                headers: {
                    "Authorization": `Bearer ${userToken}`,
                    "Content-Type": "application/json"
                }
            });
        return response;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch product rating" };
    }
};

// varient price
export const setVarientPrice = async (userToken, formData) => {
    console.log(userToken, "---------------userToken from variet---------------");
    try {
        const response = await axios.put(`${API_CONFIG.BASE_URL}${ENDPOINTS.VARIENTPRICE}`,
            formData,
            // {
            //     key: product_id,
            //     quantity: quantity
            // },
            {

                headers: {
                    "Authorization": `Bearer ${userToken}`,
                    "Content-Type": "application/json"
                }
            });
        return response;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch product rating" };
    }
};
// fetch user cart
export const fetchUserCartService = async (userToken) => {
    try {
        const response = await axios.get(`${API_CONFIG.BASE_URL}${ENDPOINTS.FETCHUSERCART}`,
            {
                headers: {
                    "Authorization": `Bearer ${userToken}`,
                    "Content-Type": "application/json"
                }
            });
        return response;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch product rating" };
    }
};

// remove product from cart
export const removeProductFromCartApi = async (userToken, id) => {
    try {
        const response = await axios.delete(`${API_CONFIG.BASE_URL}${ENDPOINTS.REMOVEPRODUCT}?key=${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${userToken}`,
                    "Content-Type": "application/json"
                }
            });
        return response;
    } catch (error) {
        throw error.response?.data || { message: "Failed to dwlete product from cart" };
    }
};

// clear complete cart
export const clearCompleteCartApi = async (userToken, id) => {
    try {
        const response = await axios.delete(`${API_CONFIG.BASE_URL}${ENDPOINTS.CLEARALLCART}?key=${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${userToken}`,
                    "Content-Type": "application/json"
                }
            });
        return response;
    } catch (error) {
        throw error.response?.data || { message: "Failed to dwlete product from cart" };
    }
};

// adding product to wishlist
export const productAddToCartApi = async (formData, userToken) => {
    try {
        console.log(formData, "---------------product_id from service---------------");
        const response = await axios.post(`${API_CONFIG.BASE_URL}${ENDPOINTS.ADDTOCART}`,
            formData,
            {
                headers: {
                    "Authorization": `Bearer ${userToken}`,
                    "Content-Type": "application/json"
                }
            });
        return response;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch product rating" };
    }
};