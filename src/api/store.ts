import { configureStore } from "@reduxjs/toolkit";

import { products } from "./products";
import { product } from "./product";
import { randomProducts } from "./randomProducts";
import { productsBrand } from "./productsBrand";

const store = configureStore({
  reducer: {
    [products.reducerPath]: products.reducer,
    [product.reducerPath]: product.reducer,
    [randomProducts.reducerPath]: randomProducts.reducer,
    [productsBrand.reducerPath]: productsBrand.reducer,
  },
  middleware: (m) =>
    m().concat(
      products.middleware,
      product.middleware,
      randomProducts.middleware,
      productsBrand.middleware
    ),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
