import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    // isLoading: localStorage.getItem("isLoading") === "true" ? true : false,
};
console.log("Initial State:", initialState);

const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        disableLoading: (state) => {
            state.isLoading = false;
        },
        enableLoading: (state) => {
            state.isLoading = true;
        }
    },
});

export const { enableLoading, disableLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
