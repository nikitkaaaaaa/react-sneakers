import React from "react";

interface ChoiseBrandProps {
  setChoise: React.Dispatch<React.SetStateAction<string>>;
}

const ChoiseBrand = ({ setChoise }: ChoiseBrandProps) => {
  const handleChoise = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChoise(e.target.value);
  };
  return (
    <select
      className="outline-none border border-black"
      onChange={handleChoise}
    >
      <option value="-price">Подороже</option>
      <option value="price">Подешевле</option>
      <option value="-rating">По рейтенгу</option>
      <option value="title">По алфавиту</option>
    </select>
  );
};

export default ChoiseBrand;
