import axios from "axios";
import { API_CONFIG } from "../config/apiConfig";
import { ENDPOINTS } from "../constants/endPoints";

// login user
export const loginUser = async (formData) => {
  try {
    console.log("Backend URL:", API_CONFIG.BASE_URL);

    const response = await axios.post(`${API_CONFIG.BASE_URL}${ENDPOINTS.LOGIN}`, formData);
    console.log(response, "---------------response &&&&&&&&&&&&&&&&&&&&&&&&&&&---------------");
    return response;
  } catch (error) {
    console.error("Login Error:", error.response?.data || error.message);

    throw error.response?.data || { message: "Login failed" };
  }
};

// register user
export const regsiterUser = async (formData) => {
  try {
    const response = await axios.post(`${API_CONFIG.BASE_URL}${ENDPOINTS.REGISTER}`, formData);
    return response;
  } catch (error) {
    // throw new Error(error.response?.data?.message || "Login failed");
    throw error.response?.data || { message: "Registration failed" };
  }
};

// verifying email for otp ( forgot password )
export const verifyEmail = async (formData) => {
  try {
    const response = await axios.post(`${API_CONFIG.BASE_URL}${ENDPOINTS.FORGOTPASSWORD}`, formData);
    return response;
  } catch (error) {
    // throw new Error(error.response?.data?.message || "Login failed");
    throw error.response?.data || { message: "Registration failed" };
  }
};

// verifying email otp ( forgot password )
export const verifyOTP = async (formData) => {
  try {
    const response = await axios.post(`${API_CONFIG.BASE_URL}${ENDPOINTS.VERIFYOTP}`, formData);
    return response;
  } catch (error) {
    // throw new Error(error.response?.data?.message || "Login failed");
    throw error.response?.data || { message: "Registration failed" };
  }
};

// verifying number for otp ( user login )
export const verifyNumber = async (formData) => {
  try {
    const response = await axios.post(`${API_CONFIG.BASE_URL}${ENDPOINTS.VERIFYNUMBER}`, formData);
    return response;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};

// verifying otp ( user login )
export const verifyOTPNumber = async (formData) => {
  try {
    const response = await axios.post(`${API_CONFIG.BASE_URL}${ENDPOINTS.VERIFYNUMBER}`, formData);
    return response;
  } catch (error) {
    // throw new Error(error.response?.data?.message || "Login failed");
    throw error.response?.data || { message: "Registration failed" };
  }
};

// verifying number for otp ( user login ) in cmplte
export const verifyEmailForOtp = async (formData) => {
  try {
    const response = await axios.post(`${API_CONFIG.BASE_URL}${ENDPOINTS.VERIFYEMAIL}`, formData);
    return response;
  } catch (error) {
    throw error.response?.data || { message: "Registration failed" };
  }
};

// verifying otp on email ( user login / registration )
export const sendOTPEmail = async (formData) => {
  try {
    const response = await axios.post(`${API_CONFIG.BASE_URL}${ENDPOINTS.VERIFYEMAIL}`, formData);
    return response;
  } catch (error) {
    // throw new Error(error.response?.data?.message || "Login failed");
    throw error.response?.data || { message: "Registration failed" };
  }
};
