import React from "react";
import { Link } from "react-router-dom";

import style from "../../style/home.module.css";
import { routes } from "../../routes/routes";
import favorties_true from "../../icons/favorites_true.svg";
import favorties_false from "../../icons/favorites_false.svg";
import {
  useAddProductToFavoritesMutation,
  useGetFavoritesProductsQuery,
  useRemoveProductsToFavoritesMutation,
} from "../../api/favoritesProducts";

interface RandomProductsProps {
  id: number;
  imageUrl: string[];
  price: number;
  title: string;
}

const RandomProducts = ({
  id,
  imageUrl,
  price,
  title,
}: RandomProductsProps) => {
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
      to={routes.product.replace(":id", String(id))}
      onClick={() => {
        window.scrollTo({ top: 0 });
      }}
      className={style.random_products}
      key={id}
    >
      {isFavorite ? (
        <img
          src={favorties_true}
          alt="favorites_true"
          onClick={handleAddOrRemoveProductToFavorites}
        />
      ) : (
        <img
          src={favorties_false}
          alt="favorites_false"
          onClick={handleAddOrRemoveProductToFavorites}
        />
      )}
      <img src={imageUrl[0]} alt={title} className="w-full" />
      <div className="font-bold text-lg">{price} ₽</div>
      <div className="text-sm">{title}</div>
    </Link>
  );
};

export default RandomProducts;
