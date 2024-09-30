import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import style from "../style/product.module.css";
import arrow from "../icons/arrow.svg";
import ProductSizePopup from "../componets/popups/ProductSizePopup";
import ProductInfoPopup from "../componets/popups/ProductInfoPopup";
import MotivationBlockProductPage from "../componets/motivationBlock/MotivationBlockProductPage";
import Card from "../componets/card/Card";
import { useGetProductQuery, useGetProductsBrandQuery } from "../api/products";
import {
  useAddProductMutation,
  useGetCartProductsQuery,
} from "../api/cartProducts";
import AddedProductPopup from "../componets/popups/AddedProductPopup";
import { routes } from "../routes/routes";
import Loading from "../componets/loading/Loading";
import BannerSmallScreenImgProduct from "../componets/smallScreen/bannerSmallScreenImgProduct/BannerSmallScreenImgProduct";
import {
  useAddProductToFavoritesMutation,
  useGetFavoritesProductsQuery,
  useRemoveProductsToFavoritesMutation,
} from "../api/favoritesProducts";
import favorites_false from "../icons/favorites_false.svg";
import favorites_true from "../icons/favorites_true.svg";

interface ProductProps {}

const Product = (props: ProductProps) => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useGetProductQuery(Number(id));

  const { data: productsBrand } = useGetProductsBrandQuery(data?.brand ?? "");

  const { data: cartProducts } = useGetCartProductsQuery();

  const { data: favoritesProducts } = useGetFavoritesProductsQuery();

  const [addProductToCart] = useAddProductMutation();

  const [addProductToFavorites] = useAddProductToFavoritesMutation();

  const [removeProductsToFavorites] = useRemoveProductsToFavoritesMutation();

  const sizeProduct: number[] = [
    38, 38.5, 39, 40, 40.5, 41, 42, 42.5, 43, 44, 44.5, 45, 45.5, 46, 47.5,
  ];

  const deliveryType: Array<{ days: string; title: string }> = [
    {
      days: "25-30 дней",
      title:
        "Привезём за 25-30 дней и отдадим в магазине или отправим почтой в ваш город",
    },
    {
      days: "9-12 дней",
      title:
        "Экспресс-доставка за 9-12 дней. Отдадим в магазине или отправим почтой в ваш город",
    },
  ];

  const [currentSize, setCurrentSize] = useState<number>(0);

  const [currentDeliveryType, setCurrentDeliveryType] = useState<number>(0);

  const [currentimage, setCurrentImage] = useState<string>("");

  const [showSizeProduct, setShowSizeProduct] = useState<boolean>(false);

  const [showInfoProduct, setShowInfoProduct] = useState<boolean>(false);

  const [addedProduct, setAddedProduct] = useState<boolean>(false);

  const isAdded = cartProducts?.find(
    (item) =>
      item.parentId === Number(id) && item.size === sizeProduct[currentSize]
  );

  const isFavorite = favoritesProducts?.find(
    (item) => item.parentId === Number(id)
  );

  const handleAddProductToCart = async () => {
    if (!data) {
      return;
    }
    setAddedProduct(true);
    const product = {
      id: Number(id),
      parentId: Number(id),
      title: data.title,
      price: data.price,
      imageUrl: data.imageUrl,
      size: sizeProduct[currentSize],
      count: 1,
    };

    try {
      await addProductToCart(product).unwrap();
    } catch (error) {
      alert(`Error adding product to cart: ${error}`);
    }
  };

  const handleAddOrRemoveProductToFavorites = async (
    e: React.MouseEvent<HTMLImageElement>
  ) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isFavorite) {
      if (!data) return;
      try {
        const product = {
          id: Number(id),
          parentId: Number(id),
          title: data.title,
          price: data.price,
          imageUrl: data.imageUrl[0],
        };
        await addProductToFavorites(product).unwrap();
      } catch (error) {
        console.error("Error adding product to favorites:", error);
      }
    } else {
      try {
        await removeProductsToFavorites(Number(isFavorite.id)).unwrap();
      } catch (error) {
        console.error("Error removing product from favorites:", error);
      }
    }
  };

  useEffect(() => {
    if (data?.imageUrl && data.imageUrl.length > 0) {
      setCurrentImage(data.imageUrl[0]);
    }
  }, [data]);

  if (isLoading) return <Loading />;

  return (
    <div className="container">
      <ProductSizePopup
        showSizeProduct={showSizeProduct}
        closePopup={() => setShowSizeProduct(false)}
      />
      <ProductInfoPopup
        showInfoProduct={showInfoProduct}
        closePopup={() => setShowInfoProduct(false)}
        title={data?.title}
        peculiarities={data?.peculiarities}
      />
      <AddedProductPopup
        addedProduct={addedProduct}
        imageUrl={data?.imageUrl[0] ?? ""}
        title={data?.title ?? ""}
        handleClosePopupCart={() => setAddedProduct(false)}
      />
      <div className={style.product}>
        <div className={style.product_left_side}>
          <img src={currentimage} alt={data?.title} className="" />
          <div className="w-full  mt-5">
            <div className={style.block_some_img_product}>
              {data?.imageUrl.map((item, index) => (
                <img
                  key={index}
                  src={item}
                  className={`${style.product_block_some_img_product} ${
                    currentimage === item
                      ? "border-2 border-black"
                      : "border-2 border-white"
                  }`}
                  onClick={() => setCurrentImage(item)}
                ></img>
              ))}
            </div>
          </div>
        </div>
        {/* продукт при маленьком экране */}
        <BannerSmallScreenImgProduct imgUrl={data?.imageUrl} />
        {/* продукт при маленьком экране */}

        <div className={style.product_rigth_side}>
          <img
            src={isFavorite ? favorites_true : favorites_false}
            alt="favorites_false"
            className="absolute top-0 right-0"
            onClick={handleAddOrRemoveProductToFavorites}
          />
          <div className="font-bold text-3xl">{data?.title}</div>
          <hr className="my-5" />
          <div>{data?.title} обладает следующими особенностями:</div>
          <ul className={style.info_for_sneakers}>
            {data?.peculiarities?.map((item, index) => (
              <li className={style.dot} key={index}>
                {item}
              </li>
            ))}
          </ul>
          <button
            className="mt-4 flex items-center font-bold"
            onClick={() => setShowInfoProduct(true)}
          >
            <div className="pr-1 underline">Показать еще</div>
            <img src={arrow} alt="arrow" />
          </button>
          <hr className="my-6" />
          <div className="font-bold text-[22px]">Выберите размер (EU)</div>
          <div className="text-gray-500 mt-2">
            Размер лучше посмотреть на язычке ваших кроссовок или измерить
            стельку.
          </div>
          <div className="flex flex-wrap my-5 gap-3">
            {sizeProduct.map((item, index) => (
              <div
                key={index}
                className={`w-[46px] border  flex justify-center items-center pt-[10px] px-[14px] pb-2  rounded-2xl cursor-pointer ${
                  currentSize === index && "bg-black text-white"
                }`}
                onClick={() => setCurrentSize(index)}
              >
                {item}
              </div>
            ))}
          </div>
          <button className=" flex items-center">
            <div className="underline" onClick={() => setShowSizeProduct(true)}>
              Таблица размеров
            </div>
          </button>
          <hr className="my-6" />
          <div className="font-bold text-[22px]">Выберите как привезти</div>
          <div className="mt-4">
            {deliveryType.map((item, index) => (
              <div
                key={index}
                className={`p-4 cursor-pointer  ${
                  currentDeliveryType === index
                    ? "border border-black"
                    : "border"
                } ${
                  currentDeliveryType == 0 ? "rounded-t-lg" : "rounded-b-lg"
                }`}
                onClick={() => setCurrentDeliveryType(index)}
              >
                <div>{item.days}</div>
                <div className="text-sm mt-2 text-gray-500">{item.title}</div>
              </div>
            ))}
          </div>
          <hr className="my-6" />
          <MotivationBlockProductPage />

          {isAdded ? (
            <Link to={routes.cart}>
              <button
                className="w-full bg-[#FF385C] text-white py-3 rounded-xl"
                onClick={() => {
                  window.scrollTo({ top: 0 });
                }}
              >
                Товар уже в корзине
              </button>
            </Link>
          ) : (
            <button
              className="w-full bg-[#FF385C] text-white py-3 rounded-xl"
              onClick={handleAddProductToCart}
            >
              Добавить товар в корзину
            </button>
          )}
        </div>
      </div>
      <hr className="mt-6 mb-10" />
      <div className="font-bold text-xl">{data?.brand}</div>
      <div className={style.brand_block}>
        {productsBrand?.slice(0, 10).map((item) => (
          <Card
            key={item.id}
            {...item}
            closePopup={() => setAddedProduct(false)}
          />
        ))}
      </div>
    </div>
  );
};

export default Product;
