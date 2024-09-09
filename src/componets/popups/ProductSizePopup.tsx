import React, { useEffect } from "react";

import style from "../../style/popups.module.css";
import close from "../../icons/close.svg";

interface ProductSizePopupProps {
  showSizeProduct: boolean;
  closePopup: () => void;
}

const ProductSizePopup = ({
  showSizeProduct,
  closePopup,
}: ProductSizePopupProps) => {
  const sizeTable: number[][] = [
    [
      38, 38.5, 39, 40, 40.5, 41, 42, 42, 5, 43, 44, 44.5, 45, 45.5, 46, 47,
      47.5,
    ],
    [
      240, 240, 245, 250, 255, 260, 265, 270, 275, 280, 285, 290, 295, 300, 305,
      310, 315,
    ],
    [
      5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13,
      13.5,
    ],
    [5, 5.5, 6, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5],
    [
      37, 37.5, 38, 39, 39.5, 40, 41, 41.5, 42, 43, 43.5, 44, 44.5, 45, 46,
      46.5, 47,
    ],
  ];

  const handleClickOutside = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  useEffect(() => {
    if (showSizeProduct) {
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
  }, [showSizeProduct]);

  return (
    <div>
      {showSizeProduct && (
        <div className={style.blur} onClick={handleClickOutside}>
          <div className={style.popup}>
            <div className={style.block_size_product}>
              <img
                onClick={closePopup}
                src={close}
                alt="close popup"
                className="absolute top-10 right-[-40px] cursor-pointer"
              />
              <div className="font-bold text-xl py-1">Таблица размеров</div>
              <div className="flex justify-between">
                <div className="mt-4">
                  <div>EU</div>
                  {sizeTable[0].map((item, index) => (
                    <li className="my-3 list-none" key={index}>
                      <b>{item}</b>
                    </li>
                  ))}
                </div>
                <div className="mt-4">
                  <div>MM</div>
                  {sizeTable[1].map((item, index) => (
                    <li className="my-3 list-none" key={index}>
                      {item}
                    </li>
                  ))}
                </div>
                <div className="mt-4">
                  <div>US</div>
                  {sizeTable[2].map((item, index) => (
                    <li className="my-3 list-none" key={index}>
                      {item}
                    </li>
                  ))}
                </div>
                <div className="mt-4">
                  <div>UK</div>
                  {sizeTable[3].map((item, index) => (
                    <li className="my-3 list-none" key={index}>
                      {item}
                    </li>
                  ))}
                </div>
                <div className="mt-4">
                  <div>RU</div>
                  {sizeTable[4].map((item, index) => (
                    <li className="my-3 list-none" key={index}>
                      {item}
                    </li>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSizePopup;
