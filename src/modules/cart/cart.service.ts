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
      throw new AppError(400, "Already added to the wishlist!");
    }
  }

  const result = await Cart.create(cart);
  return result;
};

const removeCartItems = async (userId: string, itemId: string) => {
  const itemObjectId = new Types.ObjectId(itemId);

  const updatedCart = await Cart.findOneAndUpdate(
    { user: userId },
    { $pull: { items: itemObjectId } },
    { new: true }
  );

  if (!updatedCart) {
    throw new AppError(StatusCodes.NOT_FOUND, "Wishlist not found!");
  }

  return updatedCart;
};

const getCartItemsByUser = async (userId: string) => {
  const result = await Cart.findOne({ user: userId }).populate({
    path: "items",
    populate: {
      path: "userId",
      model: "User",
    },
  });
  return result;
};

export const CartServices = {
  addToCart,
  removeCartItems,
  getCartItemsByUser,
};
