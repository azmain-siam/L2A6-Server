import { IListing } from "./listing.interface";
import Listing from "./listing.model";

const addProduct = async (payload: IListing) => {
  const result = await Listing.create(payload);

  return result;
};

const getAllProducts = async () => {
  const result = await Listing.find().populate("userId");

  return result;
};

const updateProduct = async (productId: string, data: Partial<IListing>) => {
  const result = await Listing.findByIdAndUpdate(productId, data, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteSpecificProduct = async (productId: string) => {
  const result = await Listing.findByIdAndDelete(productId);

  return result;
};

export const ListingService = {
  addProduct,
  updateProduct,
  deleteSpecificProduct,
  getAllProducts,
};
