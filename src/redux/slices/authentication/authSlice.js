import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    email_otp: null,
    phone_otp: null,
    emailAddress: "",
    phoneNumber: ""
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem("userToken");
        },
        setotp: (state, action) => {
            state.email_otp = action.payload.email_otp || state.email_otp;
            state.phone_otp = action.payload.phone_otp || state.phone_otp;
        },
        setEmail: (state, action) => {
            state.emailAddress = action.payload.emailAddress || state.emailAddress;
            state.phoneNumber = action.payload.phoneNumber || state.phoneNumber;
        },
    },
});

export const { login, logout, setotp, setEmail } = authSlice.actions;
export default authSlice.reducer;
