import React from "react";
import { Link } from "react-router-dom";

import { routes } from "../../routes/routes";
import InterfaceProducts from "../../inerface/InterfaceProducts";

interface CardProps extends InterfaceProducts {
  closePopup?: () => void;
  closeSearch?: () => void;
}

const Card = ({
  id,
  imageUrl,
  price,
  title,
  closeSearch,
  closePopup,
}: CardProps) => {
  return (
    <Link
      to={routes.product.replace(":id", String(id))}
      onClick={() => {
        window.scrollTo({ top: 0 });
        closePopup && closePopup();
        closeSearch && closeSearch();
      }}
    >
      <img src={imageUrl[0]} alt={title} />
      <div className="font-bold text-lg">{price} ₽</div>
      <div className="text-sm">{title}</div>
    </Link>
  );
};

export default Card;
