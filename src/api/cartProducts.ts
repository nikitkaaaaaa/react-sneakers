import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import InterfaceCartProducts from "../inerface/InterfaceCartProducts";

export const cartProducts = createApi({
  reducerPath: "cartProducts",
  baseQuery: fetchBaseQuery({ baseUrl: "https://9fa124965a5b597b.mokky.dev/" }),
  endpoints: (builder) => ({
    getCartProducts: builder.query<InterfaceCartProducts[], void>({
      query: () => "cart",
    }),

    addProduct: builder.mutation({
      query: (product) => ({
        url: "cart",
        method: "POST",
        body: product,
      }),
    }),
  }),
});

export const { useGetCartProductsQuery, useAddProductMutation } = cartProducts;
