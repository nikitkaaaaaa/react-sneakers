import React from "react";
import { Link } from "react-router-dom";

import style from "../../style/home.module.css";
import { useGetRandomProductsQuery } from "../../api/randomProducts";
import { getRandomProducts } from "./randomProductsFunc";
import { routes } from "../../routes/routes";

interface RundomProductsBottomProps {}

const RandomProductsBottom = (props: RundomProductsBottomProps) => {
  const { data = [] } = useGetRandomProductsQuery();

  const randomProducts = getRandomProducts(data, 10);

  return (
    <div className="mt-[150px]">
      <div className="text-center text-3xl font-bold">
        Огромное колличестов кроссовок в каталоге
      </div>
      <div className="text-center text-xl m-auto w-[65%] mt-4">
        В REACT SNEAKERS есть такие бренды кроссовок как: Vans, Jordan, New
        Balance, Nike, Asics, Reebok. Разные расцветки от классических до редких
        коллекционные вариантов.
      </div>
      <div className={style.block_rundom_products_bottom}>
        {randomProducts.map((item) => (
          <Link
            to={routes.product.replace(":id", String(item.id))}
            key={item.id}
            className="block"
          >
            <img src={item.imageUrl[0]} alt={item.title} />
            <div className="font-bold text-lg">{item.price} ₽</div>
            <div className="text-sm">{item.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RandomProductsBottom;
