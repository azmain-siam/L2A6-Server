import { IListing } from "./listing.interface";
import Listing from "./listing.model";

const addProduct = async (payload: IListing) => {
  const result = await Listing.create(payload);

  return result;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllProducts = async (filter: any) => {
  const result = await Listing.find(filter).populate("userId");

  return result;
};

const getAllProductsByUserId = async (userId: string) => {
  const result = await Listing.find({ userId: userId });

  return result;
};

const getSingleProduct = async (productId: string) => {
  const result = await Listing.findById(productId).populate("userId");

  return result;
};

const updateProduct = async (productId: string, data: Partial<IListing>) => {
  const result = await Listing.findByIdAndUpdate(productId, data, {
    new: true,
    runValidators: true,
  });

  return result;
};

const updateProductStatus = async (productId: string) => {
  const result = await Listing.findByIdAndUpdate(
    productId,
    { status: "sold" },
    {
      new: true,
    }
  );

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
  getSingleProduct,
  getAllProductsByUserId,
  updateProductStatus,
};
