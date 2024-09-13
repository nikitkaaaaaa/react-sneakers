import InterfaceProducts from "../../inerface/InterfaceProducts";

export const getRandomProducts = (
  products: InterfaceProducts[],
  count: number
) => {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
