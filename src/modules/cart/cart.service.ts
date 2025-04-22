import AppError from "../../errors/AppError";
import { IAddCart } from "./cart.interface";
import Cart from "./cart.model";

const addToCart = async (payload: IAddCart) => {
  const { user, productId } = payload;

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
      throw new AppError(400, "Product already exists in the cart");
    }
  }

  const result = await Cart.create(cart);
  return result;
};

const getCartItemsByUser = async (userId: string) => {
  const result = await Cart.findOne({ user: userId }).populate("items");

  return result;
};

export const CartServices = {
  addToCart,
  getCartItemsByUser,
};
