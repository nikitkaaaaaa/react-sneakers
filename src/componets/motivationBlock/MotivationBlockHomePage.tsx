import React from "react";

import style from "../../style/home.module.css";
import darts from "../../icons/darts.svg";
import fustDelivery from "../../icons/fustDelivery.svg";
import guarantee from "../../icons/guarantee.svg";
import loyalPrice from "../../icons/loyalPrice.svg";

interface MotivationBlockHomePageProps {}

const MotivationBlockHomePage = (props: MotivationBlockHomePageProps) => {
  const infoMotivationBlock: Array<{
    image: string;
    title: string;
    description: string;
  }> = [
    {
      image: darts,
      title: "Вы можете положиться на нас",
      description:
        "С 2017 года наш магазин осчастливил тысячи клиентов и заслужил доверие благодаря надежности и высокому качеству обслуживания.",
    },
    {
      image: fustDelivery,
      title: "Быстрая доставка",
      description:
        "Доставляем товары из наличия в день заказа,индивидуальные заказы: 9-30 рабочих дней.",
    },
    {
      image: guarantee,
      title: "Вы можете положиться на нас",
      description:
        "Все товары проходят двойную проверку на качество и оригинальность перед отправкой клиенту.",
    },
    {
      image: loyalPrice,
      title: "Лояльные цены",
      description:
        "Мы внимательно следим за рынком лимитированных вещей и предлагаем лучшие условия нашим клиентам.",
    },
  ];
  return (
    <div className="mt-32">
      <div className="text-3xl">Мультибрендовый магазин REACT SNEAKERS</div>
      <div className="my my-10">
        <div>REACT SNEAKERS — ваш источник уникальных кроссовок</div>
        Мы предлагаем индивидуальный подход, оригинальные товары от различных
        брендов
      </div>
      <div className={style.block_motivation}>
        {infoMotivationBlock.map((item, index) => (
          <div className=" flex items-start" key={index}>
            <img src={item.image} alt="img" />
            <div className="ml-5">
              <div className="text-xl">{item.title}</div>
              <div className="mt-2 text-gray-500 text-sms">
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MotivationBlockHomePage;
