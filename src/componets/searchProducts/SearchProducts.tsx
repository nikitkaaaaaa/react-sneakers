import React, { useEffect, useRef, useState } from "react";

import style from "../../style/search.module.css";
import search_gray from "../../icons/search_gray.svg";
import clearText from "../../icons/empty_products.svg";
import { useGetProductsQuery } from "../../api/products";
import Card from "../card/Card";
import { getRandomProducts } from "../random/randomProductsFunc";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import InterfaceProducts from "../../inerface/InterfaceProducts";

interface SearchProductsProps {
  showSearch: boolean;
  closeSearch: () => void;
}

const SearchProducts = ({ showSearch, closeSearch }: SearchProductsProps) => {
  const [parent] = useAutoAnimate();

  const [value, setValue] = useState<string>("");

  const { data = [] } = useGetProductsQuery({ title: `*${value.trim()}` });

  const [randomProducts, setRandomProducts] = useState<InterfaceProducts[]>([]);

  const allBrands: string[] = [
    "Vans",
    "Jordan",
    "Nike",
    "Asics",
    "Reebok",
    "New Balance",
  ];

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showSearch) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;

      const handleClickOutside = (event: MouseEvent) => {
        if (
          searchRef.current &&
          !searchRef.current.contains(event.target as Node)
        ) {
          closeSearch();
        }
      };
      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.body.style.overflow = "auto";
        document.body.style.paddingRight = "0px";
      };
    }
  }, [showSearch, closeSearch]);

  useEffect(() => {
    if (data.length && randomProducts.length === 0) {
      setRandomProducts(getRandomProducts(data, 4));
    }
  }, [data, randomProducts.length]);

  return (
    <div>
      {showSearch && (
        <div className={style.search_block} ref={searchRef}>
          <div className="container">
            <div className="mt-5 mb-16">
              <div className="flex">
                <div className="w-full mr-5 relative">
                  <img
                    src={search_gray}
                    alt="search"
                    className="absolute top-1/2 transform -translate-y-1/2 left-2 w-6 "
                  />
                  <input
                    type="text"
                    className=" w-full border border-black py-1.5 rounded-sm outline-none px-10"
                    maxLength={50}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                  {value && value?.length >= 1 && (
                    <img
                      src={clearText}
                      alt="clearText"
                      className="absolute top-1/2 transform -translate-y-1/2 right-2 w-5 cursor-pointer"
                      onClick={() => setValue("")}
                    />
                  )}
                </div>
                <button className="font-bold" onClick={closeSearch}>
                  Закрыть
                </button>
              </div>
              <div className="mt-4 flex justify-between">
                <div className=" w-[20%]">
                  <div className="font-bold mb-2">Часто ищут</div>
                  <div>
                    {allBrands.map((item, index) => (
                      <div
                        className="flex mb-2  cursor-pointer"
                        key={index}
                        onClick={() => setValue(item)}
                      >
                        <img
                          src={search_gray}
                          alt="search"
                          className="w-5 mr-2"
                        />
                        <div>{item}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-[80%]">
                  <div className="font-bold mb-2">Популярые товары</div>
                  <div className={style.search_products_block} ref={parent}>
                    {value.trim().length >= 3
                      ? data.map((item) => (
                          <Card
                            key={item.id}
                            {...item}
                            closeSearch={closeSearch}
                          />
                        ))
                      : randomProducts.map((item) => (
                          <Card
                            key={item.id}
                            {...item}
                            closeSearch={closeSearch}
                          />
                        ))}
                  </div>

                  {data.length == 0 && (
                    <div className="text-center text-2xl mt-20">
                      По вашему запросу <b>{value}</b> ничего не найденно
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchProducts;
