import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import InterfaceProducts from "../inerface/InterfaceProducts";

export const products = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({ baseUrl: "https://9fa124965a5b597b.mokky.dev/" }),
  endpoints: (builder) => ({
    getProducts: builder.query<InterfaceProducts[], void>({
      query: () => "products",
    }),
  }),
});

export const { useGetProductsQuery } = products;
