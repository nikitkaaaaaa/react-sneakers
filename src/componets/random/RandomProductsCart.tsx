import React from "react";
import { Link } from "react-router-dom";

import style from "../../style/cart.module.css";
import { useGetProductsQuery } from "../../api/products";
import { getRandomProducts } from "./randomProductsFunc";
import { routes } from "../../routes/routes";

interface RandomProductsCartProps {}

const RandomProductsCart = (props: RandomProductsCartProps) => {
  const { data } = useGetProductsQuery({});

  const randomProducts = data ? getRandomProducts(data, 4) : [];

  return (
    <div className=" flex mt-7 flex-wrap">
      {randomProducts.map((item, index) => (
        <Link
          to={routes.product.replace(":id", String(item.id))}
          key={item.id}
          className={`${style.product_recommendations} ${
            index === randomProducts.length - 1 && "border-r"
          }`}
        >
          <div className="w-[100px] h-[100px] mt-2">
            <img
              src={item.imageUrl[0]}
              alt={item.title}
              className="w-[100px] "
            />
          </div>
          <div className="ml-6">
            <div>{item.title}</div>
            <div className="mt-2 text-sm text-gray-500 ">{item.price}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RandomProductsCart;
