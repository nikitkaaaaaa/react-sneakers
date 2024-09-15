import React from "react";

import style from "../../style/cart.module.css";
import deleteItem from "../../icons/closePopupCart.svg";
import plus from "../../icons/plus.svg";
import minus from "../../icons/minus.svg";
import InterfaceCartProducts from "../../inerface/InterfaceCartProducts";

const CartCard = ({ title, price, imageUrl, size }: InterfaceCartProducts) => {
  return (
    <div className={`flex items-center py-5 ${style["cart-card"]}`}>
      <img src={imageUrl[0]} alt={title} className="w-[110px]" />
      <div className="ml-5 w-full flex justify-between items-center">
        <div>
          <div className="w-[390px]">{title}</div>
          <div className="mt-1 text-gray-500">Размер: {size}</div>
        </div>
        <div className={style.block_button_cart}>
          <button>
            <img src={minus} alt="minus" />
          </button>
          <div>1</div>
          <button>
            <img src={plus} alt="plus" />
          </button>
        </div>
        <div className="font-bold w-[70px]">{price} ₽</div>
        <img src={deleteItem} alt="deleteItem" className="cursor-pointer" />
      </div>
    </div>
  );
};

export default CartCard;
