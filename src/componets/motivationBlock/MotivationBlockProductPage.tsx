import React from "react";

import truck from "../../icons/truck.svg";
import cube from "../../icons/cube.svg";
import shield from "../../icons/shield.svg";

interface MotivationBlockProductPageProps {}

const MotivationBlockProductPage = (props: MotivationBlockProductPageProps) => {
  const infoMotivationBlock: Array<{
    image: string;
    title: string;
    description: string;
  }> = [
    {
      image: truck,
      title: "Привезём из-за границы",
      description: "Займёт 20-25 дней, а о статусе расскажем при звонке.",
    },
    {
      image: cube,
      title: "Доставим почтой или отдадим в магазине",
      description:
        "Доставка оплачивается при получении, обычно это около 300₽.",
    },
    {
      image: shield,
      title: "Гарантируем оригинальность",
      description:
        "Если приедет не оригинал — вернём тройную стоимость заказа.",
    },
  ];

  return (
    <div>
      {infoMotivationBlock.map((item, index) => (
        <div key={index} className="flex gap-4 mb-5">
          <img src={item.image} alt="img" />
          <div>
            <div className="font-bold">{item.title}</div>
            <div className="text-gray-500 mt-1 text-sm">{item.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MotivationBlockProductPage;
