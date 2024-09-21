import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetAllOrder, apiGetOrderById } from "../../Services/Orders";

const initialState = {
  allOrder: [],
  orderById: [],
  loading: false,
  error: null,
};

export const axiosAllOrder = createAsyncThunk(
  "orders/axiosOrders",
  async () => {
    try {
      const response = await apiGetAllOrder();
      return {
        data: response?.data?.data,
      };
    } catch (err) {
      console.log("Error axiosOrder: ", err);
    }
  }
);

export const axiosOrderById = createAsyncThunk(
  "order/axiosOrderById",
  async ({ id }) => {
    try {
      const response = await apiGetOrderById(id);
      return {
        data: response?.data?.data,
      };
    } catch (err) {
      console.log(err);
    }
  }
);

const orderSlide = createSlice({
  name: "orderSlide",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(axiosAllOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(axiosAllOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.allOrder = action.payload?.data;
      })
      .addCase(axiosOrderById.fulfilled, (state, action) => {
        state.orderById = action?.payload?.data;
      })
      .addCase(axiosAllOrder.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi server";
      });
  },
});

export default orderSlide.reducer;
