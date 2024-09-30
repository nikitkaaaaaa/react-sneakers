import React from "react";
import { Link } from "react-router-dom";

import { routes } from "../../routes/routes";
import InterfaceProducts from "../../inerface/InterfaceProducts";
import favorites_false from "../../icons/favorites_false.svg";
import favorites_true from "../../icons/favorites_true.svg";
import {
  useAddProductToFavoritesMutation,
  useGetFavoritesProductsQuery,
  useRemoveProductsToFavoritesMutation,
} from "../../api/favoritesProducts";

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
  const { data } = useGetFavoritesProductsQuery();

  const [addProductToFavorites] = useAddProductToFavoritesMutation();

  const [removeProductsToFavorites] = useRemoveProductsToFavoritesMutation();

  const isFavorite = data?.find((item) => item.parentId === Number(id));

  const handleAddOrRemoveProductToFavorites = async (
    e: React.MouseEvent<HTMLImageElement>
  ) => {
    if (!isFavorite) {
      try {
        const product = {
          id: id,
          parentId: id,
          title: title,
          price: price,
          imageUrl: imageUrl[0],
        };
        e.stopPropagation();
        e.preventDefault();
        await addProductToFavorites(product).unwrap();
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        e.stopPropagation();
        e.preventDefault();
        await removeProductsToFavorites(isFavorite.id).unwrap();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Link
      className=" relative"
      to={routes.product.replace(":id", String(id))}
      onClick={() => {
        window.scrollTo({ top: 0 });
        closePopup && closePopup();
        closeSearch && closeSearch();
      }}
    >
      {isFavorite ? (
        <img
          src={favorites_true}
          alt="favorites_true"
          onClick={handleAddOrRemoveProductToFavorites}
        />
      ) : (
        <img
          src={favorites_false}
          alt="favorites_false"
          onClick={handleAddOrRemoveProductToFavorites}
        />
      )}
      <img src={imageUrl[0]} alt={title} />
      <div className="font-bold text-lg">{price} ₽</div>
      <div className="text-sm">{title}</div>
    </Link>
  );
};

export default Card;
