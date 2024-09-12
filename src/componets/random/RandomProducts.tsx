import React from "react";
import { Link } from "react-router-dom";

import style from "../../style/home.module.css";
import { useGetRandomProductsQuery } from "../../api/randomProducts";
import { getRandomProducts } from "./randomProductsFunc";
import { routes } from "../../routes/routes";

interface RandomProductsProps {}

const RandomProducts = (props: RandomProductsProps) => {
  const { data = [] } = useGetRandomProductsQuery();

  const randomProducts = getRandomProducts(data, 9);

  return (
    <div className={style.block_rundom_products}>
      {randomProducts.map((item) => (
        <Link
          to={routes.product.replace(":id", String(item.id))}
          style={{ whiteSpace: "break-spaces" }}
          className="w-[150px]"
          key={item.id}
        >
          <img src={item.imageUrl[0]} alt={item.title} />
          <div className="font-bold text-lg">{item.price} ₽</div>
          <div className="text-sm">{item.title}</div>
        </Link>
      ))}
    </div>
  );
};

export default RandomProducts;
