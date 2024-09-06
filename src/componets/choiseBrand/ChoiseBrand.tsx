import React from "react";

interface ChoiseBrandProps {}

const ChoiseBrand = (props: ChoiseBrandProps) => {
  return (
    <select className="outline-none">
      <option value="-price">Подороже</option>
      <option value="price">Подешевле</option>
      <option value="-rating">По рейтенгу</option>
      <option value="title">По алфавиту</option>
    </select>
  );
};

export default ChoiseBrand;
