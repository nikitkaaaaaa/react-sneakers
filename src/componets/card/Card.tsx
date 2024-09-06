import React from "react";

interface CardProps {
  id: number;
  imageUrl: string[];
  price: number;
  title: string;
}

const Card = ({ id, imageUrl, price, title }: CardProps) => {
  return (
    <div className="">
      <img src={imageUrl[0]} alt={title} />
      <div className="font-bold text-lg">{price} ₽</div>
      <div className="text-sm">{title}</div>
    </div>
  );
};

export default Card;
