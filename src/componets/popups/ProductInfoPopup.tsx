import React from "react";

import style from "../../style/popups.module.css";
import close from "../../icons/close.svg";

interface ProductInfoPopupProps {
  showInfoProduct: boolean;
  title: string | undefined;
  peculiarities: string[] | undefined;
  closePopup: () => void;
}

const ProductInfoPopup = ({
  showInfoProduct,
  title,
  peculiarities,
  closePopup,
}: ProductInfoPopupProps) => {
  return (
    <div>
      {showInfoProduct && (
        <div className={style.blur}>
          <div className={style.popup}>
            <div className={style.block_info_product}>
              <img
                onClick={closePopup}
                src={close}
                alt="close popup"
                className="absolute top-10 right-[-40px] cursor-pointer"
              />
              <div className="font-bold text-3xl py-4">Особенности</div>
              <div className="mt-2">
                {title} обладает следующими особенностями:
              </div>
              <ul>
                {peculiarities?.map((item, index) => (
                  <li key={index} className={style.dot}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductInfoPopup;
