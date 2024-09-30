import React, { useState } from "react";
import { Link } from "react-router-dom";

import style from "../../style/header.module.css";
import search from "../../icons/search.svg";
import cart from "../../icons/cart.svg";
import favorites_false from "../../icons/favorites_false.svg";
import { routes } from "../../routes/routes";
import SearchProducts from "../searchProducts/SearchProducts";
import { useGetFavoritesProductsQuery } from "../../api/favoritesProducts";
import { useGetCartProductsQuery } from "../../api/cartProducts";

interface HeaderProps {}

const Header = (props: HeaderProps) => {
  const [showSearch, setShowSearch] = useState<boolean>(false);

  const { data: favoritesProducts } = useGetFavoritesProductsQuery();
  const { data: cartProducts } = useGetCartProductsQuery();

  const numberOfFavorites = favoritesProducts?.length ?? 0;
  const numberOfCart = cartProducts?.length ?? 0;

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
        <div className="flex items-center">
          <Link to={routes.favorites} className="mr-5 relative">
            <img src={favorites_false} alt="favorites" />
            {numberOfFavorites >= 1 && (
              <span className={style.number_of_favorites}>
                {numberOfFavorites}
              </span>
            )}
          </Link>
          <Link to={routes.cart} className="relative">
            <img src={cart} alt="cart" />
            {numberOfCart >= 1 && (
              <span className={style.number_of_cart}>{numberOfCart}</span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
