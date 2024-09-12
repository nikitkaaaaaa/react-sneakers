import React from "react";
import { Link } from "react-router-dom";

import { useGetRandomProductsQuery } from "../../api/randomProducts";
import { getRandomProducts } from "./randomProductsFunc";
import { routes } from "../../routes/routes";

interface RundomProductProps {}

const RandomProduct = (props: RundomProductProps) => {
  const { data } = useGetRandomProductsQuery();

  if (!data || data.length === 0) return <div>No products available</div>;

  const randomProduct = getRandomProducts(data, 1)[0];

  return (
    <div className="mt-[150px]">
      <div className="text-3xl">Товар дня</div>
      <div className="flex justify-center">
        <Link to={routes.product.replace(":id", String(randomProduct.id))}>
          <img
            src={randomProduct.imageUrl[0]}
            alt={randomProduct.title}
            className="w-[600px]"
          />
        </Link>
        <div className="ml-20 pt-10">
          <Link
            to={routes.product.replace(":id", String(randomProduct.id))}
            className="text-2xl w-[300px] h-[80px]"
          >
            {randomProduct.title}
          </Link>
          <div className="font-bold mt-5 text-xl">
            {data && data[0].price} ₽
          </div>
          <Link to={routes.product.replace(":id", String(randomProduct.id))}>
            <button className="border border-black px-7 py-2 rounded-md my-10">
              Подробнее
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RandomProduct;
