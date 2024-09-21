import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenProductDetail: false,
  isOpenCart: false,
  productDetail: null,
  productDetailCart: null,
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    openDialogProductDeltai: (state, action) => {
      state.isOpenProductDetail = true;
      state.productDetail = action.payload;
    },
    openDialogCart: (state, action) => {
      state.isOpenCart = true;
      state.productDetailCart = action.payload;
    },
    closeDialog: (state) => {
      state.isOpenProductDetail = false;
      state.isOpenCart = false;
      state.productDetail = null;
      state.productDetailCart = null;
    },
  },
});

export const { openDialogProductDeltai, openDialogCart, closeDialog } =
  dialogSlice.actions;
export default dialogSlice.reducer;
