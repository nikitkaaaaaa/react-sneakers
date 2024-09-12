import React from "react";
import { Link } from "react-router-dom";

import style from "../style/home.module.css";
import { routes } from "../routes/routes";
import MotivationBlockHomePage from "../componets/motivationBlock/MotivationBlockHomePage";
import RandomProduct from "../componets/random/RandomProduct";
import RandomProductsBottom from "../componets/random/RandomProductsBottom";
import RandomProducts from "../componets/random/RandomProducts";

interface HomeProps {}

const Home = (props: HomeProps) => {
  return (
    <div className="container">
      <div className={style.block_nav_categroy}>
        <Link
          to={routes.products}
          state={{ category: "Street sneakers" }}
          className={style.block_nav_categroy_item}
        >
          <div className="font-bold text-2xl w-[140px]">Кросовки и кеды</div>
          <img
            src="https://image.unicorngo.ru/_next/image?url=https://cdn.poizon.com/pro-img/origin-img/20220212/efbc58c3f40a45888ecf02783f2e97a8.jpg&w=1920&q=75"
            alt="street sneakers"
          />
        </Link>
        <Link
          to={routes.products}
          state={{ category: "Sport sneakers" }}
          className={style.block_nav_categroy_item}
        >
          <div className="font-bold text-2xl w-[200px]">Обувь для спорта</div>
          <img
            src="https://image.unicorngo.ru/_next/image?url=https://cdn.poizon.com/pro-img/origin-img/20230529/61cddcae1d094b138b317db3521b5dc5.png&w=1920&q=75"
            alt="sport sneakers"
          />
        </Link>
        <Link
          to={routes.products}
          state={{ category: "Custom sneakers" }}
          className={style.block_nav_categroy_item}
        >
          <div className="font-bold text-2xl w-[200px]">
            Кастомные кроссовки
          </div>
          <img
            src="https://image.unicorngo.ru/_next/image?url=https://cdn.poizon.com/pro-img/origin-img/20230419/b5cc996695b442d4a5cc9586fc1ff40b.jpg&w=1920&q=75"
            alt="custom sneakers"
          />
        </Link>
      </div>
      <div className="mt-12">
        <div className="text-3xl font-bold mb-5">Только что купили</div>
        <RandomProducts />
      </div>
      <MotivationBlockHomePage />
      <RandomProduct />
      <RandomProductsBottom />
    </div>
  );
};

export default Home;
