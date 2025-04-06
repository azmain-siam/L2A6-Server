import { IProduct } from "./product.interface";
import Product from "./product.model";

const addProduct = async (payload: IProduct) => {
  const result = await Product.create(payload);

  return result;
};

const updateProduct = async (productId: string, data: Partial<IProduct>) => {
  const result = await Product.findByIdAndUpdate(productId, data, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteSpecificProduct = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId);

  return result;
};

export const ProductService = {
  addProduct,
  updateProduct,
  deleteSpecificProduct,
};
