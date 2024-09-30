import React from "react";
import { Link } from "react-router-dom";

import { useRemoveProductsToFavoritesMutation } from "../../api/favoritesProducts";
import { routes } from "../../routes/routes";
import InterfaceFavoritesProducts from "../../inerface/InterfaceFavoritesProducts";
import favorites_true from "../../icons/favorites_true.svg";

const CardFavorites = ({
  id,
  imageUrl,
  price,
  title,
  parentId,
}: InterfaceFavoritesProducts) => {
  const [removeProductsToFavorites] = useRemoveProductsToFavoritesMutation();

  const handleRemoveProductToFavorites = async (
    e: React.MouseEvent<HTMLImageElement>
  ) => {
    try {
      e.stopPropagation();
      e.preventDefault();

      await removeProductsToFavorites(id).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Link
      className=" relative"
      to={routes.product.replace(":id", String(parentId))}
      onClick={() => {
        window.scrollTo({ top: 0 });
      }}
    >
      <img
        src={favorites_true}
        alt="favorites_true"
        onClick={handleRemoveProductToFavorites}
      />

      <img src={imageUrl} alt={title} />
      <div className="font-bold text-lg">{price} ₽</div>
      <div className="text-sm">{title}</div>
    </Link>
  );
};

export default CardFavorites;
