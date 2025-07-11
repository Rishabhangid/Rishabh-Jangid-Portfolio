import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subtotal: 0,
  gst: 0,
  shipping: 0,
  discount: 0,
  total: 0,
  totalItem: 0
};

const cartSummarySlice = createSlice({
  name: "cartSummary",
  initialState,
  reducers: {
    calculateSummary: (state, action) => {
      const cartItems = action.payload;

      // Calculate Subtotal (Sum of item price * quantity)
      state.subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

      // Calculate GST (Sum of tax per item)
      state.gst = cartItems.reduce((acc, item) => acc + item.tax, 0);

      // Calculate Discount (Sum of discount per item)
      state.discount = cartItems.reduce((acc, item) => acc + item.discount, 0);

      // Calculate Shipping Cost (Sum of shipping per item)
      state.shipping = cartItems.reduce((acc, item) => acc + item.shipping_cost, 0);

      // Calculate Total = Subtotal + GST + Shipping - Discount
      state.total = state.subtotal + state.gst + state.shipping - state.discount;
    },

    clearSummary: (state) => {
      state.subtotal = 0;
      state.gst = 0;
      state.discount = 0;
      state.shipping = 0;
      state.total = 0;
    },

    calculateTotalItem: (state, action) => {
      const total = action.payload;
      state.totalItem = total;
    },
  }
});

export const { calculateSummary, clearSummary, calculateTotalItem } = cartSummarySlice.actions;
export default cartSummarySlice.reducer;
