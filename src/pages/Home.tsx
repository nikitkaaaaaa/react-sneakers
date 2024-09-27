import React from "react";
import { Link } from "react-router-dom";

import style from "../style/home.module.css";
import { routes } from "../routes/routes";
import MotivationBlockHomePage from "../componets/motivationBlock/MotivationBlockHomePage";
import RandomProductsBottom from "../componets/random/RandomProductsBottom";
import RandomProducts from "../componets/random/RandomProducts";
import { useGetProductsQuery } from "../api/products";
import Loading from "../componets/loading/Loading";

interface HomeProps {}

const Home = (props: HomeProps) => {
  const { data = [], isLoading } = useGetProductsQuery({});

  const itemsBlockNavCategroy: Array<{
    title: string;
    imageUrl: string;
    category: string;
  }> = [
    {
      title: "Кросовки и кеды",
      imageUrl:
        "https://image.unicorngo.ru/_next/image?url=https://cdn.poizon.com/pro-img/origin-img/20220212/efbc58c3f40a45888ecf02783f2e97a8.jpg&w=1920&q=75",
      category: "Street sneakers",
    },
    {
      title: "Обувь для спорта",
      imageUrl:
        "https://image.unicorngo.ru/_next/image?url=https://cdn.poizon.com/pro-img/origin-img/20230529/61cddcae1d094b138b317db3521b5dc5.png&w=1920&q=75",
      category: "Sport sneakers",
    },
    {
      title: "Кастомные кроссовки",
      imageUrl:
        "https://image.unicorngo.ru/_next/image?url=https://cdn.poizon.com/pro-img/origin-img/20230419/b5cc996695b442d4a5cc9586fc1ff40b.jpg&w=1920&q=75",
      category: "Custom sneakers",
    },
  ];
  if (isLoading) return <Loading />;

  return (
    <div className="container">
      <div className={style.block_nav_categroy}>
        {itemsBlockNavCategroy.map((item, index) => (
          <Link
            key={index}
            to={routes.products}
            state={{ category: item.category }}
            className={style.block_nav_categroy_item}
          >
            <div className={style.title_block_nav_categroy_item}>
              {item.title}
            </div>
            <img src={item.imageUrl} alt={item.title} />
          </Link>
        ))}
      </div>
      <div className="mt-16">
        <div className={style.text_recomedation}>Только что купили</div>
        <RandomProducts data={data} />
      </div>
      <MotivationBlockHomePage />
      <div className="mt-16">
        <div className={style.text_recomedation}>Товары дня</div>
        <RandomProducts data={data} />
      </div>
      <RandomProductsBottom />
    </div>
  );
};

export default Home;
