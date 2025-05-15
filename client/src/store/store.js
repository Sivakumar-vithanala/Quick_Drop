import { configureStore } from "@reduxjs/toolkit";
import useReducer from "./userSlice";
import productReducer from "./productSlice";

export const store = configureStore({
  reducer: {
    user: useReducer,
    product: productReducer,
  },
});
