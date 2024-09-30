import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import InterfaceFavoritesProducts from "../inerface/InterfaceFavoritesProducts";

export const favoritesProducts = createApi({
  reducerPath: "favoritesProducts",
  baseQuery: fetchBaseQuery({ baseUrl: "https://9fa124965a5b597b.mokky.dev/" }),
  tagTypes: ["Favorites"],
  endpoints: (builder) => ({
    getFavoritesProducts: builder.query<InterfaceFavoritesProducts[], void>({
      query: () => "/favorites",
      providesTags: [{ type: "Favorites", id: "LIST" }],
    }),

    addProductToFavorites: builder.mutation<
      InterfaceFavoritesProducts,
      InterfaceFavoritesProducts
    >({
      query: (product) => ({
        url: "favorites",
        method: "POST",
        body: product,
      }),
      invalidatesTags: [{ type: "Favorites", id: "LIST" }],
    }),

    removeProductsToFavorites: builder.mutation<void, number>({
      query: (id) => ({
        url: `favorites/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Favorites", id: "LIST" }],
    }),
  }),
});

export const {
  useGetFavoritesProductsQuery,
  useAddProductToFavoritesMutation,
  useRemoveProductsToFavoritesMutation,
} = favoritesProducts;
