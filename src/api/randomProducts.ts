import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import InterfaceProducts from "../inerface/InterfaceProducts";

export const randomProducts = createApi({
  reducerPath: "randomProducts",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://9fa124965a5b597b.mokky.dev",
  }),
  endpoints: (builder) => ({
    getRandomProducts: builder.query<InterfaceProducts[], void>({
      query: () => "/products",
    }),
  }),
});

export const { useGetRandomProductsQuery } = randomProducts;
