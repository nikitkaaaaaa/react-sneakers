import React from "react";

import close_filter_block from "../../../icons/close_filter_block.svg";

interface FilterSmallScreenProps {
  showFilterSmallScreen: boolean;
  closeFilter: () => void;
  filteredBrands: string[];
  priceFrom: string;
  setPriceFrom: React.Dispatch<React.SetStateAction<string>>;
  priceTo: string;
  setPriceTo: React.Dispatch<React.SetStateAction<string>>;
  currentBrands: string[];
  handleBrandChange: (brand: string) => void;
}

const FilterSmallScreen = ({
  showFilterSmallScreen,
  closeFilter,
  filteredBrands,
  priceFrom,
  setPriceFrom,
  priceTo,
  setPriceTo,
  currentBrands,
  handleBrandChange,
}: FilterSmallScreenProps) => {
  return (
    <div>
      {showFilterSmallScreen && (
        <div className="fixed inset-0 z-10 bg-white p-5 border-2 border-black flex flex-col overflow-hidden">
          <div className="flex justify-between items-center">
            <div className="font-bold text-4xl">ФИЛЬТРЫ</div>
            <img
              src={close_filter_block}
              alt="close_filter_block"
              className="border p-3.5 rounded-md"
              onClick={() => {
                closeFilter();
                window.scrollTo({ top: 0 });
              }}
            />
          </div>
          <div className=" mt-12">
            <div className="font-bold mb-3">Цена, RUB</div>
            {/* Сортировка по цене */}

            <div className="flex gap-2 ">
              <div className="border flex p-3 gap-1 cursor-text rounded-md w-full">
                <div>от</div>
                <input
                  type="text"
                  className="outline-none font-bold w-full"
                  placeholder="7835 ₽"
                  value={priceFrom}
                  onChange={(e) => setPriceFrom(e.target.value)}
                />
              </div>
              <div className="border flex p-3 gap-1 cursor-text rounded-md w-full">
                <div>до</div>
                <input
                  type="text"
                  className="outline-none font-bold w-full"
                  placeholder="37535 ₽"
                  value={priceTo}
                  onChange={(e) => setPriceTo(e.target.value)}
                />
              </div>
            </div>

            {/* Сортировка по цене */}
          </div>
          {/* Сортировка по брендам */}
          <div className=" mt-16 ">
            <div className="font-bold mb-3 ">Бренды</div>
            {filteredBrands.map((brand) => (
              <div key={brand}>
                <input
                  type="checkbox"
                  id={brand}
                  onChange={() => handleBrandChange(brand)}
                  checked={currentBrands.includes(brand)}
                />
                <label htmlFor={brand} className="ml-3">
                  {brand}
                </label>
              </div>
            ))}
          </div>
          {/* Сортировка по брендам */}
          <div className="mt-auto flex justify-center">
            <button
              className="bg-black text-white mt-auto py-3.5 rounded-xl w-[90%]"
              onClick={() => {
                closeFilter();
                window.scrollTo({ top: 0 });
              }}
            >
              Применить
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSmallScreen;
