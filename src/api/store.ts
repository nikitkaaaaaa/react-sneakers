import { configureStore } from "@reduxjs/toolkit";

import { products } from "./products";

const store = configureStore({
  reducer: {
    [products.reducerPath]: products.reducer,
  },
  middleware: (m) => m().concat(products.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
