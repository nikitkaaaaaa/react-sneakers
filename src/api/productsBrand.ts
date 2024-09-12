import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import InterfaceProducts from "../inerface/InterfaceProducts";

export const productsBrand = createApi({
  reducerPath: "productsBrand",
  baseQuery: fetchBaseQuery({ baseUrl: "https://9fa124965a5b597b.mokky.dev/" }),
  endpoints: (builder) => ({
    getProductsBrand: builder.query<InterfaceProducts[], string>({
      query: (brand) => `products?brand=${brand}`,
    }),
  }),
});

export const { useGetProductsBrandQuery } = productsBrand;
