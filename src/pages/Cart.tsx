import React from "react";

import { useGetCartProductsQuery } from "../api/cartProducts";

interface CartProps {}

const Cart = (props: CartProps) => {
  const { data = [] } = useGetCartProductsQuery();

  return (
    <div className="container">
      {data.map((item) => (
        <div className="w-[150px]">
          <img src={item.imageUrl[0]} alt="" />
          <div>{item.title}</div>
        </div>
      ))}
    </div>
  );
};

export default Cart;
