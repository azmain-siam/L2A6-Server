import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { IListing } from "../listings/listing.interface";
import Listing from "../listings/listing.model";
import { IAddCart } from "./cart.interface";
import Cart from "./cart.model";
import { Types } from "mongoose";

const addToCart = async (payload: IAddCart) => {
  const { user, productId } = payload;

  const product: IListing | null = await Listing.findById(productId);

  if (!product) {
    throw new AppError(404, "Product not found!");
  }

  if (product.status === "sold") {
    throw new AppError(StatusCodes.BAD_REQUEST, "Product already sold!");
  }

  let cart = await Cart.findOne({ user });

  if (!cart) {
    const data = {
      user: user,
      items: [productId],
    };

    cart = new Cart(data);
  } else {
    const isProductExist = cart.items.find(
      (item) => item.toString() === productId
    );
    if (!isProductExist) {
      cart.items.push(productId);
    } else {
      throw new AppError(400, "Product already exists in the cart!");
    }
  }

  const result = await Cart.create(cart);
  return result;
};

// const removeCartItems = async (userId: string, itemId: string) => {
//   const cart = await Cart.findOne({ user: userId });

//   if (!cart) {
//     throw new AppError(StatusCodes.NOT_FOUND, "Cart not found!");
//   }

//   const newItems = cart.items.filter((item) => item.toString() !== itemId);

//   const result = await Cart.findOneAndUpdate(
//     { user: userId },
//     { $set: { items: newItems } },
//     {
//       new: true,
//     }
//   );

//   return result;
// };

const removeCartItems = async (userId: string, itemId: string) => {
  const itemObjectId = new Types.ObjectId(itemId);

  const updatedCart = await Cart.findOneAndUpdate(
    { user: userId },
    { $pull: { items: itemObjectId } },
    { new: true }
  );

  if (!updatedCart) {
    throw new AppError(StatusCodes.NOT_FOUND, "Cart not found!");
  }

  return updatedCart;
};

const getCartItemsByUser = async (userId: string) => {
  const result = await Cart.findOne({ user: userId }).populate("items");

  return result;
};

export const CartServices = {
  addToCart,
  removeCartItems,
  getCartItemsByUser,
};
