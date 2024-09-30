import React from "react";

import style from "../style/favorites.module.css";
import favorites_true from "../icons/favorites_true.svg";
import { useGetFavoritesProductsQuery } from "../api/favoritesProducts";
import Loading from "../componets/loading/Loading";
import CardFavorites from "../componets/card/CardFavorites";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface FavoritesProps {}

const Favorites = (props: FavoritesProps) => {
  const [parent] = useAutoAnimate();

  const { data = [], isLoading } = useGetFavoritesProductsQuery();

  if (isLoading) return <Loading />;

  return (
    <div className="container">
      <div>
        {data.length >= 1 ? (
          <div className={style.block_products_favorites} ref={parent}>
            {data.map((item) => (
              <CardFavorites key={item.id} {...item} />
            ))}
          </div>
        ) : (
          <div className=" flex justify-center mt-[50px]">
            <div className=" max-w-[450px]  flex  items-center flex-col">
              <img
                src={favorites_true}
                alt="favorites_empty"
                className="w-[200px]"
              />
              <div className="font-bold text-3xl text-center">
                Избранные товары
              </div>
              <div className="text-center">
                Тут вы будете видеть товары, которые лайкнули. Сихронизируется
                со всеми устройствами. Это удобно!
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
