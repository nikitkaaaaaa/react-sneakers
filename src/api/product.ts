import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import InterfaceProducts from "../inerface/InterfaceProducts";

export const product = createApi({
  reducerPath: "product",
  baseQuery: fetchBaseQuery({ baseUrl: "https://9fa124965a5b597b.mokky.dev/" }),
  endpoints: (builder) => ({
    getProduct: builder.query<InterfaceProducts, number>({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useGetProductQuery } = product;
