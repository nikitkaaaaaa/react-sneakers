import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import InterfaceProducts from "../inerface/InterfaceProducts";

export const products = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({ baseUrl: "https://9fa124965a5b597b.mokky.dev/" }),
  endpoints: (builder) => ({
    getProducts: builder.query<
      InterfaceProducts[],
      {
        choise?: string;
        category?: string;
        currentBrands?: string[];
        priceFrom?: string;
        priceTo?: string;
      }
    >({
      query: ({ choise, category, currentBrands, priceFrom, priceTo }) => {
        const params = new URLSearchParams();

        if (choise) params.append("sortBy", choise);
        if (category) params.append("category", category);
        if (priceFrom) params.append("price[from]", priceFrom);
        if (priceTo) params.append("price[to]", priceTo);
        if (currentBrands && currentBrands.length > 0) {
          currentBrands.forEach((brand) => {
            params.append("brand[]", brand);
          });
        }

        return `products?${params}`;
      },
    }),

    getProductsBrand: builder.query<InterfaceProducts[], string>({
      query: (brand) => `products?brand=${brand}`,
    }),

    getProduct: builder.query<InterfaceProducts, number>({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsBrandQuery,
  useGetProductQuery,
} = products;
