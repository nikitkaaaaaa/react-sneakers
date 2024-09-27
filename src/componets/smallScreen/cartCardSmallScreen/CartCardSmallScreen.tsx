import React from "react";
import { Link } from "react-router-dom";

import style from "../../../style/cart.module.css";
import deleteItem from "../../../icons/closePopupCart.svg";
import plus from "../../../icons/plus.svg";
import minus from "../../../icons/minus.svg";
import { routes } from "../../../routes/routes";
import InterfaceCartProducts from "../../../inerface/InterfaceCartProducts";

interface CartCardSmallScreenProps extends InterfaceCartProducts {
  handleAddOneProduct: () => void;
  handleRemoveOneProduct: () => void;
  removeProduct: (id: number) => void;
}

const CartCardSmallScreen = ({
  id,
  title,
  price,
  imageUrl,
  size,
  parentId,
  count,
  handleAddOneProduct,
  handleRemoveOneProduct,
  removeProduct,
}: CartCardSmallScreenProps) => {
  return (
    <>
      <div className={style.cart_card_small_screen}>
        <div className="flex">
          <Link
            to={routes.product.replace(":id", String(parentId))}
            onClick={() => {
              window.scrollTo({ top: 0 });
            }}
          >
            <img src={imageUrl[0]} alt={title} className="w-[110px]" />
          </Link>
          <div className="w-full ml-3 flex justify-between items-start">
            <div>
              <Link
                to={routes.product.replace(":id", String(parentId))}
                onClick={() => {
                  window.scrollTo({ top: 0 });
                }}
              >
                <div className={style.title_product}>{title}</div>
              </Link>
              <div className="mt-1 text-gray-500">Размер: {size}</div>
            </div>
            <img
              src={deleteItem}
              alt="deleteItem"
              className="cursor-pointer mt-1"
              onClick={() => removeProduct(id)}
            />
          </div>
        </div>

        <div className="w-full flex justify-between items-center mt-8">
          <div className={style.block_button_cart}>
            <button onClick={handleRemoveOneProduct}>
              <img src={minus} alt="minus" />
            </button>
            <div>{count}</div>
            <button onClick={handleAddOneProduct}>
              <img src={plus} alt="plus" />
            </button>
          </div>
          <div className="font-bold ">{price * count} ₽</div>
        </div>
      </div>
    </>
  );
};

export default CartCardSmallScreen;
