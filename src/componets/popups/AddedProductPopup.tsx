import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import style from "../../style/popups.module.css";
import { routes } from "../../routes/routes";
import closePopupCart from "../../icons/closePopupCart.svg";

interface AddedProductPopupProps {
  addedProduct: boolean;
  imageUrl: string;
  title: string;
  handleClosePopupCart: () => void;
}

const AddedProductPopup = ({
  addedProduct,
  imageUrl,
  title,
  handleClosePopupCart,
}: AddedProductPopupProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (addedProduct) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          handleClosePopupCart();
        }, 500);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [addedProduct, handleClosePopupCart]);

  return (
    <div>
      {addedProduct && (
        <div
          className={`${style.added_product} ${
            isVisible ? style.active : style.inactive
          }`}
        >
          <Link
            to={routes.cart}
            className="flex items-start"
            onClick={() => {
              window.scrollTo({ top: 0 });
            }}
          >
            <div className="w-32">
              <img src={imageUrl} alt="" className="w-32" />
            </div>
            <div className="ml-5">
              <div className="font-bold mb-2">В корзине</div>
              <div className="text-gray-600 w-[160px]">{title}</div>
            </div>
          </Link>

          <img
            src={closePopupCart}
            alt="close popup cart"
            className="absolute top-3 right-4 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsVisible(false);
              setTimeout(() => {
                handleClosePopupCart();
              }, 500);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default AddedProductPopup;
