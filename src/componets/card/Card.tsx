import React from "react";
import { Link } from "react-router-dom";

import { routes } from "../../routes/routes";

interface CardProps {
  id: number;
  imageUrl: string[];
  price: number;
  title: string;
}

const Card = ({ id, imageUrl, price, title }: CardProps) => {
  return (
    <Link to={routes.product.replace(":id", String(id))}>
      <img src={imageUrl[0]} alt={title} />
      <div className="font-bold text-lg">{price} ₽</div>
      <div className="text-sm">{title}</div>
    </Link>
  );
};

export default Card;
