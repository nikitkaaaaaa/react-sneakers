import React, { useEffect } from "react";

import style from "../../style/popups.module.css";
import sending from "../../icons/sending.svg";
import close from "../../icons/close.svg";
import { useGetProductsServerQuery } from "../../api/cartProducts";

interface SendingProductsProps {
  showSendingPopup: boolean;
  closePopup: () => void;
  clearCart: () => Promise<void>;
}

const SendingProductsPopup = ({
  showSendingPopup,
  closePopup,
  clearCart,
}: SendingProductsProps) => {
  const { data = [] } = useGetProductsServerQuery();

  const handleClickOutside = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
    clearCart();
  };

  useEffect(() => {
    if (showSendingPopup) {
      const scrollBarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    }
    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    };
  }, [showSendingPopup]);

  return (
    <div>
      {showSendingPopup && (
        <div className={style.blur} onClick={handleClickOutside}>
          <div className={style.popup}>
            <div className={style.block_sending_products}>
              <img
                onClick={closePopup}
                src={close}
                alt="close popup"
                className="absolute top-10 right-[-40px] cursor-pointer"
              />
              <div className="text-center">
                <div className="flex justify-center">
                  <img src={sending} alt="sending" />
                </div>
                <div className="text-3xl font-bold my-5">Заказ оформлен!</div>
                <div className="text-gray-500">
                  Ваш заказ{" "}
                  <span className="text-black font-bold">
                    #{data[data.length - 1].id}{" "}
                  </span>
                  успешно оформлен. Ожидайте товар.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendingProductsPopup;
