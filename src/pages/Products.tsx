import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import style from "../style/products.module.css";
import { useGetProductsQuery } from "../api/products";
import Card from "../componets/card/Card";
import { routes } from "../routes/routes";
import ChoiseBrand from "../componets/ChoiseBrand/ChoiseBrand";
import empty_products from "../icons/empty_products.svg";
import filter from "../icons/filter.svg";
import Loading from "../componets/loading/Loading";
import FilterSmallScreen from "../componets/smallScreen/filterSmallScreen/FilterSmallScreen";

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

  const [showFilterSmallScreen, setShowFilterSmallScreen] =
    useState<boolean>(false);

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

  if (isLoading) return <Loading />;

  return (
    <>
      <FilterSmallScreen
        showFilterSmallScreen={showFilterSmallScreen}
        closeFilter={() => setShowFilterSmallScreen(false)}
        filteredBrands={filteredBrands}
        priceFrom={priceFrom}
        setPriceFrom={setPriceFrom}
        priceTo={priceTo}
        setPriceTo={setPriceTo}
        currentBrands={currentBrands}
        handleBrandChange={handleBrandChange}
      />

      <div className="container">
        <div className="text-gray-500 text-sm pt-10 pb-2">
          <Link to={routes.home}>Главная</Link> /{" "}
          <span>{categoryProductsRU}</span>
        </div>
        <div className={style.category_products}>Мужские кроссовки и кеды</div>
        {/* Фильтр под маленький экран */}
        <div className={style.block_filters_and_choise_small_screen}>
          <ChoiseBrand setChoise={setChoise} />
          <div
            className="flex items-center"
            onClick={() => setShowFilterSmallScreen(true)}
          >
            <div className="font-bold mr-2">Фильтры</div>
            <img src={filter} alt="filter" />
          </div>
        </div>
        {/* Фильтр под маленький экран */}
      </div>
      <hr />
      <div className="container">
        <div className={style.block_filters_and_choise}>
          <div className="font-bold">Цена, RUB</div>
          <ChoiseBrand setChoise={setChoise} />
        </div>
        <div className="flex justify-between">
          <div className={style.products_block_left_side}>
            {/* Сортировка по цене */}
            <div className="w-full  flex flex-col gap-2 items-start">
              <div className="flex flex-row gap-2 w-full">
                <div className="flex items-center max-w-full w-full py-[12px] px-[13px] gap-1 cursor-text border rounded-md">
                  <div className="flex items-center">от</div>
                  <input
                    type="text"
                    placeholder="7835 ₽"
                    className="w-full min-w-[0px] inline-flex text-inherit font-bold outline-none"
                    value={priceFrom}
                    onChange={(e) => setPriceFrom(e.target.value)}
                  />
                </div>
                <div className="flex items-center max-w-full w-full py-[12px] px-[13px] gap-1 cursor-text border rounded-md">
                  <div className="flex items-center">до</div>
                  <input
                    type="text"
                    className="w-full min-w-[0px] inline-flex text-inherit font-bold outline-none"
                    placeholder="37535 ₽ "
                    value={priceTo}
                    onChange={(e) => setPriceTo(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* Сортировка по цене */}

            <div className="font-bold mb-3 mt-5">Бренды</div>
            {/* Cортировка по брендам */}
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
            {/* Cортировка по брендам */}
          </div>
          {data.length >= 1 ? (
            <div className={style.products_block_right_side} ref={parent}>
              {data.map((item) => (
                <Card key={item.id} {...item} />
              ))}
            </div>
          ) : (
            <div className={style.block_empty_products}>
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
