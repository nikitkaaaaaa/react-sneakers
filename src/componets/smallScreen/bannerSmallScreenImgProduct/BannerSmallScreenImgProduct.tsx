import React from "react";

import style from "../../../style/product.module.css";
import Slider from "react-slick";

interface ProductSmallScreenImgProps {
  imgUrl: string[] | undefined;
}

const BannerSmallScreenImgProduct = ({
  imgUrl,
}: ProductSmallScreenImgProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className={style.product_baner_img}>
      <link
        rel="stylesheet"
        type="text/css"
        charSet="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <Slider {...settings}>
        {imgUrl?.map((item, index) => (
          <img key={index} src={item} />
        ))}
      </Slider>
    </div>
  );
};

export default BannerSmallScreenImgProduct;
