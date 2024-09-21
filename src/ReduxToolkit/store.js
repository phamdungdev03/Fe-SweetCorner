import { configureStore } from "@reduxjs/toolkit";
import loginSlide from "./sildes/loginSlide";
import accountSlide from "./sildes/AccountSlide";
import toastSlide from "./sildes/ToastSlide";
import categorySlide from "./sildes/CategoriesSlide";
import productSlide from "./sildes/ProductSlide";
import orderSlide from "./sildes/OrderSlide";
import dialogSlice from "./sildes/DialogSlide";

const store = configureStore({
  reducer: {
    loginReducer: loginSlide,
    accountReducer: accountSlide,
    categoryReducer: categorySlide,
    productReducer: productSlide,
    toastReducer: toastSlide,
    orderReducer: orderSlide,
    dialogReducer: dialogSlice,
  },
});

export default store;
