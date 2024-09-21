import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetCategories } from "../../Services/Categories";

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

export const axiosCatrgories = createAsyncThunk(
  "categories/axiosCatrgories",
  async ({ name }) => {
    try {
      const response = await apiGetCategories(name);
      return {
        data: response?.data?.data,
      };
    } catch (err) {
      console.log(err);
    }
  }
);

const categorySlide = createSlice({
  name: "categorySlide",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(axiosCatrgories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(axiosCatrgories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action?.payload?.data;
        state.error = null;
      })
      .addCase(axiosCatrgories.rejected, (state) => {
        state.loading = false;
        state.error = "Lỗi sever !";
      });
  },
});

export default categorySlide.reducer;
