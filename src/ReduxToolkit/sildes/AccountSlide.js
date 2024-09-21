import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  apiGetAccountById,
  apiGetAccountLogin,
  apiGetAccounts,
} from "../../Services/Accounts";

const initialState = {
  accounts: [],
  accountById: null,
  accountLogin: {},
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 10,
  totalPages: 1,
};

export const axiosAccounts = createAsyncThunk(
  "accounts/axiosAccounts",
  async ({ currentPage, pageSize, email }, { rejectWithValue }) => {
    try {
      const response = await apiGetAccounts(currentPage, pageSize, email);
      return {
        data: response?.data?.data,
        currentPage: currentPage,
        totalPages: response?.data?.totalPages,
      };
    } catch (err) {
      console.log("Error axiosAccounts: ", err);
      return rejectWithValue(err?.response?.data || err?.message);
    }
  }
);

export const axiosAccountForLogin = createAsyncThunk(
  "accounts/axiosAccountForLogin",
  async () => {
    try {
      const response = await apiGetAccountLogin();
      const data = response?.data?.data;

      if (Array.isArray(data) && data.length > 0) {
        const account = data[0];
        return {
          data: account,
        };
      } else {
        return {
          data: {},
        };
      }
    } catch (err) {
      console.log("Error axiosAccountForLogin: ", err);
    }
  }
);

export const axiosAccountById = createAsyncThunk(
  "accountById/axiosAccountById",
  async ({ accountId }) => {
    try {
      const response = await apiGetAccountById(accountId);
      const data = response?.data?.data;

      return {
        data: data,
      };
    } catch (err) {
      console.log("Error axiosAccountById: ", err);
    }
  }
);

const accountSlide = createSlice({
  name: "accountsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(axiosAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(axiosAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.accounts = action.payload?.data;
        state.totalPages = action.payload?.totalPages;
        state.currentPage = action.payload?.currentPage;
      })
      .addCase(axiosAccountForLogin.fulfilled, (state, action) => {
        state.accountLogin = action.payload?.data;
      })
      .addCase(axiosAccountById.fulfilled, (state, action) => {
        state.accountById = action?.payload?.data;
      })
      .addCase(axiosAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Lõi sever !";
      });
  },
});

export default accountSlide.reducer;
