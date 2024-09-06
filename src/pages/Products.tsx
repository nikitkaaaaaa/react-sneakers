import React from "react";

import style from "../style/products.module.css";
import { useGetProductsQuery } from "../api/products";
import Card from "../componets/card/Card";
import ChoiseBrand from "../componets/choiseBrand/ChoiseBrand";

interface ProductsProps {}

const Products = (props: ProductsProps) => {
  const { data = [] } = useGetProductsQuery();

  const brands: string[] = [
    "Vans",
    "Jordan",
    "Nike",
    "Asics",
    "New Balance",
    "Reebok",
  ];

  return (
    <>
      <div className="flex justify-between items-center">
        <div>Бренды</div>

        <ChoiseBrand />
      </div>
      <div className="flex justify-between">
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
        <div className={style.products_block}>
          {data.map((item) => (
            <Card key={item.id} {...item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
