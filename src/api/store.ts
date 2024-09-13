import { configureStore } from "@reduxjs/toolkit";

import { products } from "./products";
import { cartProducts } from "./cartProducts";

const store = configureStore({
  reducer: {
    [products.reducerPath]: products.reducer,
    [cartProducts.reducerPath]: cartProducts.reducer,
  },
  middleware: (m) => m().concat(products.middleware, cartProducts.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
