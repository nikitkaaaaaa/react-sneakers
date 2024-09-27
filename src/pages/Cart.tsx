import React, { useMemo, useState } from "react";

import style from "../style/cart.module.css";
import {
  useAddProductsInServerMutation,
  useGetCartProductsQuery,
  useRemoveProductMutation,
} from "../api/cartProducts";
import close from "../icons/closePopupCart.svg";
import CartCard from "../componets/card/CartCard";
import arrow_v2 from "../icons/arrow_v2.svg";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import RandomProductsCart from "../componets/random/RandomProductsCart";
import SendingProductsPopup from "../componets/popups/SendingProductsPopup";
import clear_cart from "../icons/clear_cart.svg";
import { Link } from "react-router-dom";
import { routes } from "../routes/routes";
import Loading from "../componets/loading/Loading";

interface CartProps {}

const Cart = (props: CartProps) => {
  const [parent, enableAnimations] = useAutoAnimate();

  const { data = [], isLoading } = useGetCartProductsQuery();

  const [removeProduct] = useRemoveProductMutation();

  const [AddProductsInServer] = useAddProductsInServerMutation();

  const [showSendingPopup, setShowSendingPopup] = useState<boolean>(false);

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

  const handleAddProductsInServer = async () => {
    try {
      const products = data.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        imageUrl: item.imageUrl,
        size: item.size,
        count: item.count,
      }));

      await AddProductsInServer({ products, price: totalPrice }).unwrap();
      setShowSendingPopup(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="container">
      <SendingProductsPopup
        showSendingPopup={showSendingPopup}
        closePopup={() => setShowSendingPopup(false)}
        clearCart={() => handleClearCart()}
      />
      <div className="text-3xl mt-8 mb-5">Корзина</div>
      {data.length > 0 ? (
        <div className={style.cart}>
          <div className={style.block_cart_left_side}>
            <div className="flex justify-between items-center border-t border-l border-r  p-5">
              <div>Товары в корзине</div>
              <div
                className="flex items-center cursor-pointer"
                onClick={handleClearCart}
              >
                <div className="mr-3">очистить</div>
                <img src={close} alt="clear cart" />
              </div>
            </div>
            <div className={style.block_products_cart} ref={parent}>
              {data.map((item) => (
                <CartCard key={item.id} {...item} />
              ))}
            </div>
          </div>
          <div className={style.block_cart_right_side}>
            <div className="flex justify-between items-center font-bold text-xl">
              <div>Итого:</div>
              <div>{totalPrice} ₽</div>
            </div>
            <div className="border relative my-4">
              <input
                type="text"
                placeholder="Есть промокод?"
                className="w-full py-2 pl-4 outline-none"
              />
              <img
                src={arrow_v2}
                alt="arrow"
                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
              />
            </div>
            <button
              className="w-full py-2 rounded bg-black text-white"
              onClick={handleAddProductsInServer}
            >
              Оформить заказ
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center  mt-8  h-[310px] flex flex-col justify-center">
          <div className="flex justify-center mb-5">
            <img src={clear_cart} alt="clear cart" />
          </div>
          <div className="text-2xl">Ваша корзина пуста.</div>
          <div className="mt-2">
            <Link to={routes.home} className="underline">
              Нажмите здесь
            </Link>
            , чтобы продолжить покупки
          </div>
        </div>
      )}
      <div className="text-xl mt-16 mb-5">Персональные рекомендации</div>
      <RandomProductsCart />
    </div>
  );
};

export default Cart;
