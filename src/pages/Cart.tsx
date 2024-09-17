import React, { useMemo } from "react";

import {
  useGetCartProductsQuery,
  useRemoveProductMutation,
} from "../api/cartProducts";
import style from "../style/cart.module.css";
import close from "../icons/closePopupCart.svg";
import CartCard from "../componets/card/CartCard";
import arrow_v2 from "../icons/arrow_v2.svg";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { getRandomProducts } from "../componets/random/randomProductsFunc";
import { useGetRandomProductsQuery } from "../api/products";
import { Link } from "react-router-dom";
import { routes } from "../routes/routes";

interface CartProps {}

const Cart = (props: CartProps) => {
  const [parent, enableAnimations] = useAutoAnimate();

  const { data = [] } = useGetCartProductsQuery();

  const { data: products } = useGetRandomProductsQuery();

  const [removeProduct] = useRemoveProductMutation();

  const randomProducts = products ? getRandomProducts(products, 4) : [];

  const totalPrice = useMemo(() => {
    return data.reduce(
      (sum, product) => sum + product.price * product.count,
      0
    );
  }, [data]);

  const handleClearCart = async () => {
    try {
      for (let i = 0; i < data.length; i++) {
        await removeProduct(data[i].id).unwrap();
      }
    } catch (error) {
      alert(`Failed to clear cart: ${error}`);
    }
  };

  return (
    <div className="container">
      <div className="text-3xl mt-8 mb-5">Корзина</div>
      <div className="flex justify-between">
        <div className="w-[78%]">
          <div className="flex justify-between items-center border-t border-l  border-r p-5">
            <div>Товары в корзине</div>
            <div
              className="flex items-center cursor-pointer"
              onClick={handleClearCart}
            >
              <div className="mr-3">очистить</div>
              <img src={close} alt="clear cart" />
            </div>
          </div>
          <hr />
          <div className="px-5 border-l border-r border-b mb-36" ref={parent}>
            {data.map((item) => (
              <CartCard key={item.id} {...item} />
            ))}
          </div>
        </div>
        <div className="w-[22%] border ml-8 px-5 py-4 h-[177.7px]">
          <div className="flex justify-between  items-center font-bold text-xl">
            <div>Итого:</div>
            <div>{totalPrice} ₽</div>
          </div>
          <div className="border relative my-4">
            <input
              type="text"
              placeholder="Есть промокод?"
              className=" w-full py-2 pl-4 outline-none"
            />
            <img
              src={arrow_v2}
              alt="arrow"
              className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
            />
          </div>
          <button className="w-full py-2 rounded bg-black text-white">
            Оформить заказ
          </button>
        </div>
      </div>
      <div className="text-xl">Персональные рекомендации</div>
      <div className=" flex mt-7 flex-wrap">
        {randomProducts.map((item, index) => (
          <Link
            to={routes.product.replace(":id", String(item.id))}
            key={item.id}
            className={`${style.product_recommendations} ${
              index === randomProducts.length - 1 && "border-r"
            }`}
          >
            <div className="w-[100px] h-[100px] mt-2">
              <img
                src={item.imageUrl[0]}
                alt={item.title}
                className="w-[100px] "
              />
            </div>
            <div className="ml-6">
              <div>{item.title}</div>
              <div className="mt-2 text-sm text-gray-500 ">{item.price}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Cart;
