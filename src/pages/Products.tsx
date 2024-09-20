import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import style from "../style/products.module.css";
import { useGetProductsQuery } from "../api/products";
import Card from "../componets/card/Card";
import { routes } from "../routes/routes";
import ChoiseBrand from "../componets/ChoiseBrand/ChoiseBrand";
import empty_products from "../icons/empty_products.svg";

const Products = () => {
  const [parent] = useAutoAnimate();

  const [choise, setChoise] = useState<string>("");

  const [currentBrands, setCurrentBrands] = useState<string[]>([]);

  const [priceFrom, setPriceFrom] = useState<string>("");
  const [delayPriceFrom, setDelayPriceFrom] = useState<string>(priceFrom);

  const [priceTo, setPriceTo] = useState<string>("");
  const [delayPriceTo, setDelayPriceTo] = useState<string>(priceTo);

  const location = useLocation();

  const [categoryProductsRU, setCategoryProductsRU] = useState<string>("");

  const category = location.state?.category || "";

  const { data = [], isLoading } = useGetProductsQuery({
    choise,
    category,
    currentBrands,
    priceFrom: delayPriceFrom,
    priceTo: delayPriceTo,
  });

  const allBrands: string[] = [
    "Vans",
    "Jordan",
    "Nike",
    "Asics",
    "New Balance",
    "Reebok",
  ];

  const filteredBrands =
    category === "Sport sneakers"
      ? allBrands.filter((brand) => brand !== "Vans")
      : allBrands;

  const handleBrandChange = (brand: string) => {
    if (currentBrands.includes(brand)) {
      setCurrentBrands(currentBrands.filter((b) => b !== brand));
    } else {
      setCurrentBrands([...currentBrands, brand]);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDelayPriceFrom(priceFrom);
      setDelayPriceTo(priceTo);
    }, 1500);

    return () => clearTimeout(handler);
  }, [priceFrom, priceTo]);

  useEffect(() => {
    if (category === "Sport sneakers") {
      setCategoryProductsRU("Обувь для спорта");
    } else if (category === "Custom sneakers") {
      setCategoryProductsRU("Кастомные кроссовки");
    } else if (category === "Street sneakers") {
      setCategoryProductsRU("Кроссовки и кеды");
    }
  }, [category]);

  if (isLoading)
    return (
      <div className="text-center font-bold text-5xl h-[100vh]">loading</div>
    );

  return (
    <>
      <div className="container">
        <div className="text-gray-500 text-sm pt-10 pb-3">
          <Link to={routes.home}>Главная</Link> /{" "}
          <span>{categoryProductsRU}</span>
        </div>
        <div className="text-3xl pb-10">Мужские кроссовки и кеды</div>
      </div>
      <hr />
      <div className="container">
        <div className="flex justify-between items-center mt-8 mb-3">
          <div className="font-bold">Цена, RUB</div>
          <ChoiseBrand setChoise={setChoise} />
        </div>
        <div className="flex justify-between">
          <div className="w-[20%]">
            <div className="flex gap-2 ">
              <div className="border flex p-3 gap-1 cursor-text rounded-md">
                <div>от</div>
                <input
                  type="text"
                  className="outline-none font-bold w-full"
                  placeholder="7835 ₽"
                  value={priceFrom}
                  onChange={(e) => setPriceFrom(e.target.value)}
                />
              </div>
              <div className="border flex p-3 gap-1 cursor-text rounded-md">
                <div>до</div>
                <input
                  type="text"
                  className="outline-none font-bold w-full"
                  placeholder="37535 ₽"
                  value={priceTo}
                  onChange={(e) => setPriceTo(e.target.value)}
                />
              </div>
            </div>

            <div className="font-bold mb-3 mt-5">Бренды</div>
            {filteredBrands.map((brand) => (
              <div key={brand}>
                <input
                  type="checkbox"
                  id={brand}
                  onChange={() => handleBrandChange(brand)}
                  checked={currentBrands.includes(brand)}
                />
                <label htmlFor={brand} className="ml-3">
                  {brand}
                </label>
              </div>
            ))}
          </div>
          {data.length >= 1 ? (
            <div className={style.products_block} ref={parent}>
              {data.map((item) => (
                <Card key={item.id} {...item} />
              ))}
            </div>
          ) : (
            <div className=" w-[80%] flex justify-center items-center ml-5 flex-col">
              <img src={empty_products} alt="empty_products" />
              <div className="mt-3 mb-1 text-2xl">К сожалению, раздел пуст</div>
              <div className="text-gray-500">
                В данный момент нет активных товаров
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
