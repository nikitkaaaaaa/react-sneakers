import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import style from "../style/product.module.css";
import { useGetProductQuery } from "../api/product";
import arrow from "../icons/arrow.svg";
import MotivationBlock from "../componets/motivationBlock/MotivationBlock";

interface ProductProps {}

const Product = (props: ProductProps) => {
  const { id } = useParams<{ id: string }>();

  const { data } = useGetProductQuery(Number(id));

  const sizeProduct: number[] = [
    38, 38.5, 39, 40, 40.5, 41, 42, 42.5, 43, 44, 44.5, 45, 45.5, 46, 47.5,
  ];

  const deliveryType: Array<{ days: string; title: string }> = [
    {
      days: "25-30 дней",
      title:
        "Привезём за 25-30 дней и отдадим в магазине или отправим почтой в ваш город",
    },
    {
      days: "9-12 дней",
      title:
        "Экспресс-доставка за 9-12 дней. Отдадим в магазине или отправим почтой в ваш город",
    },
  ];

  const [currentSize, setCurrentSize] = useState<number>(0);

  const [currentDeliveryType, setCurrentDeliveryType] = useState<number>(0);

  const [currentimage, setCurrentImage] = useState<string>("");

  useEffect(() => {
    if (data?.imageUrl && data.imageUrl.length > 0) {
      setCurrentImage(data.imageUrl[0]);
    }
  }, [data]);

  return (
    <div className="container">
      <div className={style.product}>
        <div className={style.product_left_side}>
          <img src={currentimage} alt={data?.title} />
          <div className="flex gap-3.5 mt-5">
            {data?.imageUrl.map((item, index) => (
              <img
                key={index}
                src={item}
                className={`w-[152px] py-[3px] px-[30px] rounded-lg ${
                  currentimage === item
                    ? "border-2 border-black"
                    : "border-2 border-white"
                }`}
                onClick={() => setCurrentImage(item)}
              ></img>
            ))}
          </div>
        </div>

        <div className={style.product_rigth_side}>
          <div className="font-bold text-3xl">{data?.title}</div>
          <hr className="my-5" />
          <div>{data?.title} обладает следующими особенностями:</div>
          <ul className={style.info_for_sneakers}>
            {data?.peculiarities.map((item, index) => (
              <li className={style.dot} key={index}>
                {item}
              </li>
            ))}
          </ul>

          <button className="mt-4 flex items-center font-bold">
            <div className="pr-1 underline">Показать еще</div>
            <img src={arrow} alt="arrow" />
          </button>
          <hr className="my-6" />
          <div className="font-bold text-[22px]">Выберите размер (EU)</div>
          <div className="text-gray-500 mt-2">
            Размер лучше посмотреть на язычке ваших кроссовок или измерить
            стельку.
          </div>
          <div className="flex flex-wrap my-3 gap-3">
            {sizeProduct.map((item, index) => (
              <div
                key={index}
                className={`w-[46px] border  flex justify-center items-center pt-[10px] px-[14px] pb-2  rounded-2xl cursor-pointer ${
                  currentSize === index && "bg-black text-white"
                }`}
                onClick={() => setCurrentSize(index)}
              >
                {item}
              </div>
            ))}
          </div>
          <button className=" flex items-center">
            <div className="underline">Таблица размеров</div>
          </button>
          <hr className="my-6" />
          <div className="font-bold text-[22px]">Выберите как привезти</div>
          <div className="mt-4">
            {deliveryType.map((item, index) => (
              <div
                key={index}
                className={`p-4 ${
                  currentDeliveryType === index
                    ? "border border-black"
                    : "border"
                } ${
                  currentDeliveryType == 0 ? "rounded-t-lg" : "rounded-b-lg"
                }`}
                onClick={() => setCurrentDeliveryType(index)}
              >
                <div>{item.days}</div>
                <div className="text-sm mt-2 text-gray-500">{item.title}</div>
              </div>
            ))}
          </div>
          <hr className="my-6" />
          <MotivationBlock />
        </div>
      </div>
    </div>
  );
};

export default Product;
