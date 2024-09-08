import { configureStore } from "@reduxjs/toolkit";

import { products } from "./products";
import { product } from "./product";

const store = configureStore({
  reducer: {
    [products.reducerPath]: products.reducer,
    [product.reducerPath]: product.reducer,
  },
  middleware: (m) => m().concat(products.middleware, product.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
