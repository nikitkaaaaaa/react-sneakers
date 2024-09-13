import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import InterfaceProducts from "../inerface/InterfaceProducts";

export const products = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({ baseUrl: "https://9fa124965a5b597b.mokky.dev/" }),
  endpoints: (builder) => ({
    getProducts: builder.query<
      InterfaceProducts[],
      { choise: string; category: string }
    >({
      query: ({ choise, category }) =>
        `products?sortBy=${choise}&category=${category}`,
    }),

    getProductsBrand: builder.query<InterfaceProducts[], string>({
      query: (brand) => `products?brand=${brand}`,
    }),

    getRandomProducts: builder.query<InterfaceProducts[], void>({
      query: () => "/products",
    }),

    getProduct: builder.query<InterfaceProducts, number>({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsBrandQuery,
  useGetRandomProductsQuery,
  useGetProductQuery,
} = products;
