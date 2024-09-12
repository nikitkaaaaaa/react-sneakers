import React from "react";
import { Link } from "react-router-dom";

import style from "../../style/home.module.css";
import { useGetRandomProductsQuery } from "../../api/randomProducts";
import { getRandomProducts } from "./randomProductsFunc";
import { routes } from "../../routes/routes";
import Card from "../card/Card";

interface RundomProductsBottomProps {}

const RandomProductsBottom = (props: RundomProductsBottomProps) => {
  const { data = [] } = useGetRandomProductsQuery();

  const randomProducts = getRandomProducts(data, 10);

  return (
    <div className="mt-[180px]">
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
          <Card key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default RandomProductsBottom;
