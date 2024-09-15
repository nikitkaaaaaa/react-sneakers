import React from "react";

import { useGetCartProductsQuery } from "../api/cartProducts";
import close from "../icons/closePopupCart.svg";
import CartCard from "../componets/card/CartCard";
import arrow_v2 from "../icons/arrow_v2.svg";

interface CartProps {}

const Cart = (props: CartProps) => {
  const { data = [] } = useGetCartProductsQuery();

  return (
    <div className="container">
      <div className="text-3xl mb-5 mt-8">Корзина</div>
      <div className="flex justify-between">
        <div className="w-[78%]">
          <div className="flex justify-between items-center border-t border-l  border-r p-5">
            <div>Товары в корзине</div>
            <div className="flex items-center cursor-pointer">
              <div className="mr-2">очистить</div>
              <img src={close} alt="clear cart" />
            </div>
          </div>
          <hr />
          <div className="px-5 border-l border-r border-b">
            {data.map((item) => (
              <CartCard key={item.id} {...item} />
            ))}
          </div>
        </div>
        <div className="w-[22%] border ml-8 px-5 py-4 h-[177.7px]">
          <div className="flex justify-between  items-center font-bold text-xl">
            <div>Итого:</div>
            <div>60000 ₽</div>
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
    </div>
  );
};

export default Cart;
