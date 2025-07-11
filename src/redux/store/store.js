// rEDUX STORE

// import { configureStore } from "@reduxjs/toolkit";
// export const store = configureStore({
//     reducer:{
//         auth : authReducer
//     },
// })



import authReducer from "../slices/authentication/authSlice"
import cartSummary from "../slices/cartSummary/cartSummarySlice"
import loadingReducer from "../slices/loading/loadingSlice"
import cartReducer from "../slices/cart/cartSlice"
import themeReducer from "../slices/theme/themeSlice"
// import logger from 'redux-logger';


import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage
// import authReducer from "./slices/authSlice";

// const persistConfig = {
//   key: "root",
//   storage, // Using localStorage to persist state
// };

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["loading"], // Excludes only loading slice from persistence
};
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
// const persistedLoadingReducer = persistReducer(persistConfig, loadingReducer);
const persistedCartReducer = persistReducer(persistConfig, cartReducer);
const persistedThemeReducer = persistReducer(persistConfig, themeReducer);
const cartSummaryReducer = persistReducer(persistConfig, cartSummary);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    // loading: persistedLoadingReducer,
    loading: loadingReducer,
    cart: persistedCartReducer,
    theme: persistedThemeReducer,
    cartSummary: cartSummaryReducer, 

  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export const persistor = persistStore(store);
export default store;
