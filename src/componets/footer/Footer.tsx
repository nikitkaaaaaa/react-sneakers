import React from "react";

interface FooterProps {}

const Footer = (props: FooterProps) => {
  const store: string[] = [
    "МАГАЗИН",
    "Оплата",
    "Доставка",
    "Помощь",
    "Гарантия и безопасность",
    "Проверка на оригинальность",
  ];

  const catalog: string[] = [
    "КАТАЛОГ",
    "Кроссовки",
    "Все бренды",
    "Air Jordan",
    "Nike",
    "New Balance",
    "Asics",
    "Vans",
  ];

  const company: string[] = [
    "КОМПАНИЯ",
    "Приложение",
    "Команда",
    "Отзывы",
    "Контакты",
  ];

  const brands: string[] = [
    "БРЕНДЫ",
    "Nike",
    "Jordan",
    "New Balance",
    "Asics",
    "Vans",
    "Reebok",
  ];

  return (
    <div className="mt-[265px] bg-black text-white">
      <div className="container">
        <div className="py-[60px]">
          <div className="text-3xl mb-20">REACT SNEAKERS</div>
          <div className=" flex flex-row gap-8">
            <div className="flex flex-col gap-3 w-full pr-7 border-r border-r-gray-500">
              {store.map((item, index) => (
                <div
                  key={index}
                  className={` ${
                    index === 0 ? "text-xl text-white" : "text-[#7B8D9A]"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3 w-full pr-7 border-r border-r-gray-500">
              {catalog.map((item, index) => (
                <div
                  key={index}
                  className={` ${
                    index === 0 ? "text-xl text-white" : "text-[#7B8D9A]"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3  w-full pr-7 border-r border-r-gray-500">
              {company.map((item, index) => (
                <div
                  key={index}
                  className={` ${
                    index === 0 ? "text-xl text-white" : "text-[#7B8D9A]"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3  w-full pr-7 border-r border-r-gray-500">
              {brands.map((item, index) => (
                <div
                  key={index}
                  className={` ${
                    index === 0 ? "text-xl text-white" : "text-[#7B8D9A]"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
