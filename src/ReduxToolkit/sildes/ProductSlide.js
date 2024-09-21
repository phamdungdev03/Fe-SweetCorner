import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetProductById, apiGetProducts } from "../../Services/Products";

const initialState = {
  products: [],
  productById: {},
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 10,
  totalPages: 1,
};

export const axiosProducts = createAsyncThunk(
  "products/axiosProducts",
  async ({
    currentPage,
    pageSize,
    name = "",
    minPrice = 0,
    maxPrice = Infinity,
    categories = "",
    sortOption = "Tên A-Z",
  }) => {
    try {
      const response = await apiGetProducts(
        currentPage,
        pageSize,
        name,
        minPrice,
        maxPrice,
        categories,
        sortOption
      );
      return {
        data: response?.data?.data,
        currentPage: currentPage,
        totalPages: response?.data?.totalPage,
      };
    } catch (err) {
      console.log("Error axiosProducts: ", err);
    }
  }
);

export const axiosProductById = createAsyncThunk(
  "productById/axiosProductById",
  async ({ id }) => {
    console.log("id: ", id);
    try {
      const response = await apiGetProductById(id);
      return {
        id,
        data: response?.data?.data,
      };
    } catch (err) {
      console.log("Error axiosProductById: ", err);
    }
  }
);

const productSlide = createSlice({
  name: "productSlide",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(axiosProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(axiosProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload?.data;
        state.totalPages = action.payload?.totalPages;
        state.currentPage = action.payload?.currentPage;
      })
      .addCase(axiosProductById.fulfilled, (state, action) => {
        const { id, data } = action.payload;
        state.productById = {
          ...state.productById,
          [id]: data,
        };
      })
      .addCase(axiosProducts.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi server";
      });
  },
});

export default productSlide.reducer;
