import React from "react";

import style from "../../style/cart.module.css";
import deleteItem from "../../icons/closePopupCart.svg";
import plus from "../../icons/plus.svg";
import minus from "../../icons/minus.svg";
import {
  useAddOneProductMutation,
  useRemoveOneProductMutation,
  useRemoveProductMutation,
} from "../../api/cartProducts";
import InterfaceCartProducts from "../../inerface/InterfaceCartProducts";
import { Link } from "react-router-dom";
import { routes } from "../../routes/routes";

const CartCard = ({
  id,
  title,
  price,
  imageUrl,
  size,
  parentId,
  count,
}: InterfaceCartProducts) => {
  const [removeProduct] = useRemoveProductMutation();

  const [addOneProduct] = useAddOneProductMutation();

  const [removeOneProduct] = useRemoveOneProductMutation();

  const handleAddOneProduct = async () => {
    try {
      await addOneProduct({
        id,
        count: count + 1,
        size,
        price: price,
      });
    } catch (error) {
      alert(`Error updating item count${error}`);
    }
  };

  const handleRemoveOneProduct = async () => {
    if (count > 1) {
      try {
        await removeOneProduct({
          id,
          count: count - 1,
          size,
          price: price,
        });
      } catch (error) {
        alert(`Error updating item count ${error}`);
      }
    } else {
      return;
    }
  };

  return (
    <div className={`flex items-center py-6 ${style["cart-card"]}`}>
      <Link
        to={routes.product.replace(":id", String(parentId))}
        onClick={() => {
          window.scrollTo({ top: 0 });
        }}
      >
        <img src={imageUrl[0]} alt={title} className="w-[110px]" />
      </Link>
      <div className="ml-5 w-full flex justify-between items-center">
        <div>
          <Link
            to={routes.product.replace(":id", String(parentId))}
            onClick={() => {
              window.scrollTo({ top: 0 });
            }}
          >
            <div className="w-[390px]">{title}</div>
          </Link>

          <div className="mt-1 text-gray-500">Размер: {size}</div>
        </div>
        <div className={style.block_button_cart}>
          <button onClick={handleRemoveOneProduct}>
            <img src={minus} alt="minus" />
          </button>
          <div>{count}</div>
          <button onClick={handleAddOneProduct}>
            <img src={plus} alt="plus" />
          </button>
        </div>
        <div className="font-bold w-[120px] ">{price * count} ₽</div>
        <img
          src={deleteItem}
          alt="deleteItem"
          className="cursor-pointer"
          onClick={() => removeProduct(id)}
        />
      </div>
    </div>
  );
};

export default CartCard;
