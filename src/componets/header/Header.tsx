import React, { useState } from "react";
import { Link } from "react-router-dom";

import style from "../../style/header.module.css";
import search from "../../icons/search.svg";
import cart from "../../icons/cart.svg";
import { routes } from "../../routes/routes";
import SearchProducts from "../searchProducts/SearchProducts";

interface HeaderProps {}

const Header = (props: HeaderProps) => {
  const [showSearch, setShowSearch] = useState<boolean>(false);

  return (
    <div className="container">
      <SearchProducts
        showSearch={showSearch}
        closeSearch={() => setShowSearch(false)}
      />
      <div className={style.header}>
        <img
          src={search}
          alt="search"
          className="cursor-pointer"
          onClick={() => setShowSearch(true)}
        />
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
