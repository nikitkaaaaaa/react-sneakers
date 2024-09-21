import React from "react";
import { Link } from "react-router-dom";

import style from "../../style/home.module.css";

import { getRandomProducts } from "./randomProductsFunc";
import { routes } from "../../routes/routes";
import InterfaceProducts from "../../inerface/InterfaceProducts";

interface RandomProductsProps {
  data: InterfaceProducts[];
}

const RandomProducts = ({ data }: RandomProductsProps) => {
  const randomProducts = getRandomProducts(data, 9);

  return (
    <div className={style.block_rundom_products}>
      {randomProducts.map((item) => (
        <Link
          to={routes.product.replace(":id", String(item.id))}
          onClick={() => {
            window.scrollTo({ top: 0 });
          }}
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
