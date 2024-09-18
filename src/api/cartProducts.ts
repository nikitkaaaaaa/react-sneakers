import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import InterfaceCartProducts from "../inerface/InterfaceCartProducts";
import InterfaceServer from "../inerface/InterfaceServer";

export const cartProducts = createApi({
  reducerPath: "cartProducts",
  baseQuery: fetchBaseQuery({ baseUrl: "https://9fa124965a5b597b.mokky.dev/" }),
  tagTypes: ["Cart", "Server"],
  endpoints: (builder) => ({
    getCartProducts: builder.query<InterfaceCartProducts[], void>({
      query: () => "cart",
      providesTags: [{ type: "Cart", id: "LIST" }],
    }),

    addProduct: builder.mutation<void, InterfaceCartProducts>({
      query: (product) => ({
        url: "cart",
        method: "POST",
        body: product,
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),

    addOneProduct: builder.mutation<
      void,
      { id: number; count: number; size: number; price: number }
    >({
      query: ({ id, count, size, price }) => ({
        url: `cart/${id}`,
        method: "PATCH",
        body: { count, size, price },
      }),
      invalidatesTags: ["Cart"],
    }),

    removeOneProduct: builder.mutation<
      void,
      { id: number; count: number; size: number; price: number }
    >({
      query: ({ id, count, size, price }) => ({
        url: `cart/${id}`,
        method: "PATCH",
        body: { count, size, price },
      }),
      invalidatesTags: ["Cart"],
    }),

    removeProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Cart", id: "LIST" }],
    }),

    addProductsInServer: builder.mutation<void, InterfaceServer>({
      query: (products) => ({
        url: "server",
        method: "POST",
        body: products,
      }),
      invalidatesTags: [{ type: "Server", id: "LIST" }],
    }),

    getProductsServer: builder.query<InterfaceServer[], void>({
      query: () => "server",
      providesTags: [{ type: "Server", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCartProductsQuery,
  useAddProductMutation,
  useRemoveProductMutation,
  useAddOneProductMutation,
  useRemoveOneProductMutation,
  useAddProductsInServerMutation,
  useGetProductsServerQuery,
} = cartProducts;
