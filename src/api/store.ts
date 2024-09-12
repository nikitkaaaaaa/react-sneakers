import { configureStore } from "@reduxjs/toolkit";

import { products } from "./products";
import { product } from "./product";
import { randomProducts } from "./randomProducts";

const store = configureStore({
  reducer: {
    [products.reducerPath]: products.reducer,
    [product.reducerPath]: product.reducer,
    [randomProducts.reducerPath]: randomProducts.reducer,
  },
  middleware: (m) =>
    m().concat(
      products.middleware,
      product.middleware,
      randomProducts.middleware
    ),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
