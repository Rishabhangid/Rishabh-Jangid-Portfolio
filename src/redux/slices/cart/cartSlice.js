import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage if available
const loadCartFromStorage = () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
};

// Function to calculate the total cart cost
const calculateCartTotal = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.totalPrice + item.gstAmount, 0);
};

const calculateTotalGst = (cartItems) => {
    return cartItems.reduce((totalGst, item) => totalGst + item.gstAmount, 0);
};

const calculateSubTotal = (cartItems) => {
    return cartItems.reduce((subtotal, item) => subtotal + item.totalPrice, 0);
};


const calculateGST = (price, quantity, tax, taxType) => {
    let gstAmount = 0;

    if (taxType === "percent") {
        gstAmount = (price * tax) / 100; // GST as percentage
    } else if (taxType === "fixed") {
        gstAmount = tax; // Fixed GST per product
    }

    return gstAmount * quantity; // Total GST for all items
};


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: loadCartFromStorage(),
        cartTotal: calculateCartTotal(loadCartFromStorage()), // ✅ Initialize total
        totalGst: calculateTotalGst(loadCartFromStorage()),
        subTotal: calculateSubTotal(loadCartFromStorage()),

        // api varibalbe only
        sub_total : 0,
        gst: 0,
        shipping: 0,
        discount: 0,
        coupan_code: 0,
        total: 0
    },
    reducers: {

        calculatePrice : (state, action) =>{
            
        },

        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.cartItems.find((i) => i.id === item.id);

            if (existingItem) {
                existingItem.quantity += 1;
                existingItem.totalPrice = existingItem.quantity * existingItem.unit_price;
                existingItem.gstAmount = calculateGST(existingItem.unit_price, existingItem.quantity, existingItem.tax, "percent");
            } else {
                state.cartItems.push({
                    ...item,
                    quantity: 1,
                    totalPrice: item.unit_price,
                    gstAmount: calculateGST(item.unit_price, 1, item.tax, "percent"),
                });
            }

            state.subTotal = calculateSubTotal(state.cartItems);
            state.cartTotal = calculateCartTotal(state.cartItems);
            state.totalGst = calculateTotalGst(state.cartItems);
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },


        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
            state.subTotal = calculateSubTotal(state.cartItems);
            state.cartTotal = calculateCartTotal(state.cartItems); // ✅ Update total including GST
            state.totalGst = calculateTotalGst(state.cartItems);
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },

        clearCart: (state) => {
            state.cartItems = [];
            state.subTotal = 0;
            state.cartTotal = 0; // ✅ Reset total including GST
            state.totalGst = 0;
            localStorage.removeItem("cart");
        },

        increaseQuantity: (state, action) => {
            const item = state.cartItems.find((i) => i.id === action.payload);
            if (item && item.quantity < item.stock) {
                item.quantity += 1;
                item.totalPrice = item.quantity * item.unit_price;
                item.gstAmount = calculateGST(item.unit_price, item.quantity, item.tax, item.tax_type); // ✅ Update GST
            }
            state.cartTotal = calculateCartTotal(state.cartItems); // ✅ Update total including GST
            state.subTotal = calculateSubTotal(state.cartItems);
            state.totalGst = calculateTotalGst(state.cartItems);
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },

        decreaseQuantity: (state, action) => {
            const item = state.cartItems.find((i) => i.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                item.totalPrice = item.quantity * item.unit_price;
                item.gstAmount = calculateGST(item.unit_price, item.quantity, item.tax, item.tax_type); // ✅ Update GST
            }
            state.cartTotal = calculateCartTotal(state.cartItems); // ✅ Update total including GST
            state.subTotal = calculateSubTotal(state.cartItems);
            state.totalGst = calculateTotalGst(state.cartItems);
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },
        mergeCart: (state, action) => {
            state.cartItems = action.payload;
            state.cartTotal = calculateCartTotal(state.cartItems); // ✅ Update total
            localStorage.setItem("cart", JSON.stringify(state.cartItems));
        },
    },
});

export const { addToCart, removeFromCart, clearCart, mergeCart, decreaseQuantity, increaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
