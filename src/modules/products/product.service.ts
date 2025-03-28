import { IProduct } from "./product.interface";
import Product from "./product.model";

const addProduct = async (payload: IProduct) => {
  const result = await Product.create(payload);

  return result;
};

export const ProductService = {
  addProduct,
};
