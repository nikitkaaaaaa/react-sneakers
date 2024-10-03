import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import style from "../../style/cart.module.css";
import { useGetProductsQuery } from "../../api/products";
import { getRandomProducts } from "./randomProductsFunc";
import { routes } from "../../routes/routes";
import InterfaceProducts from "../../inerface/InterfaceProducts";

interface RandomProductsCartProps {}

const RandomProductsCart = (props: RandomProductsCartProps) => {
  const { data } = useGetProductsQuery({});

  const [randomProducts, setRandomProducts] = useState<InterfaceProducts[]>([]);

  useEffect(() => {
    setRandomProducts(data ? getRandomProducts(data, 4) : []);
  }, [data]);

  return (
    <div className={style.block_product_recommendations}>
      {randomProducts.map((item, index) => (
        <Link
          onClick={() => window.scrollTo({ top: 0 })}
          to={routes.product.replace(":id", String(item.id))}
          key={item.id}
          className={`${style.product_recommendations} ${
            index === randomProducts.length - 1 && "border-r"
          }`}
        >
          <div className="max-w-[110px] max-h-[120px] mt-2">
            <img src={item.imageUrl[0]} alt={item.title} className="w-full" />
          </div>
          <div className="ml-3">
            <div>{item.title}</div>
            <div className="mt-2 text-sm text-gray-500 font-bold">
              {item.price} ₽
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RandomProductsCart;
