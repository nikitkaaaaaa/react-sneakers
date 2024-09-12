import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useAutoAnimate } from "@formkit/auto-animate/react";
import style from "../style/products.module.css";
import { useGetProductsQuery } from "../api/products";
import Card from "../componets/card/Card";
import { routes } from "../routes/routes";
import ChoiseBrand from "../componets/ChoiseBrand/ChoiseBrand";

interface ProductsProps {}

const Products = (props: ProductsProps) => {
  const [choise, setChoise] = useState<string>("-price");

  const [parent, enableAnimations] = useAutoAnimate();

  const location = useLocation();

  const [categoryProductsRU, setCategoryProductsRU] = useState<string>("");

  const category = location.state?.category;

  useEffect(() => {
    if (category === "Sport sneakers") {
      setCategoryProductsRU("Обувь для спорта");
    } else if (category == "Custom sneakers") {
      setCategoryProductsRU("Кастомные кросовки");
    } else if (category == "Street sneakers") {
      setCategoryProductsRU("Кроссовки и кеды");
    }
  }, [category]);

  const { data = [], isLoading } = useGetProductsQuery({ choise, category });

  const brands: string[] = [
    "Vans",
    "Jordan",
    "Nike",
    "Asics",
    "New Balance",
    "Reebok",
  ];

  if (isLoading)
    return <div className="text-center font-bold text-5xl">loading</div>;

  return (
    <>
      <div className="container">
        <div className="text-gray-500  text-sm pt-10 pb-3">
          <Link to={routes.home}>Главная</Link> /{" "}
          <span>{categoryProductsRU}</span>
        </div>
        <div className="text-3xl pb-10">Мужские кроссовки и кеды</div>
      </div>
      <hr />
      <div className="container">
        <div className="flex justify-between items-center mt-8">
          <div className="font-bold">Бренды</div>
          <ChoiseBrand setChoise={setChoise} />
        </div>
        <div className="flex justify-between mt-3">
          <div className=" w-[20%]">
            {brands.map((brand) => (
              <div key={brand}>
                <input type="checkbox" id={brand} />
                <label htmlFor={brand} className="ml-3">
                  {brand}
                </label>
              </div>
            ))}
          </div>
          <div className={style.products_block} ref={parent}>
            {data.map((item) => (
              <Card key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
