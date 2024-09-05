import React from "react";

import style from "../../style/header.module.css";
import search from "../../icons/search.svg";
import cart from "../../icons/cart.svg";

interface HeaderProps {}

const Header = (props: HeaderProps) => {
  return (
    <div className="container">
      <div className={style.header}>
        <img src={search} alt="search" className="cursor-pointer" />
        <div className="font-bold text-2xl">REACT SNEAKERS</div>
        <div>
          <img src={cart} alt="cart" />
        </div>
      </div>
    </div>
  );
};

export default Header;
