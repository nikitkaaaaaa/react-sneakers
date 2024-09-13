import React from "react";
import { Link } from "react-router-dom";

import style from "../../style/header.module.css";
import search from "../../icons/search.svg";
import cart from "../../icons/cart.svg";
import { routes } from "../../routes/routes";

interface HeaderProps {}

const Header = (props: HeaderProps) => {
  return (
    <div className="container">
      <div className={style.header}>
        <img src={search} alt="search" className="cursor-pointer" />
        <Link className="font-bold text-2xl" to={routes.home}>
          REACT SNEAKERS
        </Link>
        <div>
          <Link to={routes.cart}>
            <img src={cart} alt="cart" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
