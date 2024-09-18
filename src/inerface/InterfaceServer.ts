export default interface InterfaceServer {
  id?: number;
  price: number;
  products: {
    id: number;
    title: string;
    price: number;
    imageUrl: string[];
    size: number;
    count: number;
  }[];
}
