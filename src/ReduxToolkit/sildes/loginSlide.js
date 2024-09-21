import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiLogin } from "../../Services/Auth";

const initialState = {
  accessToken: sessionStorage.getItem("accessToken") || null,
  refreshToken: sessionStorage.getItem("refreshToken") || null,
  loading: false,
  error: null,
  accountLogin: {},
};

export const axiosLogin = createAsyncThunk(
  "login/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await apiLogin(data);
      return {
        message: response?.data?.message,
        accessToken: response?.data?.accessToken,
        refreshToken: response?.data?.refreshToken,
        data: response?.data?.data,
      };
    } catch (err) {
      console.log("Error axiosLogin: ", err);
      return rejectWithValue(
        err.response.data.message || "Có lỗi xảy ra khi kết nối đến server"
      );
    }
  }
);

const loginSlide = createSlice({
  name: "login ",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(axiosLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(axiosLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action?.payload?.accessToken;
        state.refreshToken = action.payload?.refreshToken;
        state.accountLogin = action?.payload?.data;
        if (action?.payload?.accessToken) {
          sessionStorage.setItem("accessToken", action.payload?.accessToken);
          sessionStorage.setItem("refreshToken", action?.payload?.refreshToken);
        } else {
          state.error = action.payload;
        }
      })
      .addCase(axiosLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Lỗi sever";
      });
  },
});

export default loginSlide.reducer;
