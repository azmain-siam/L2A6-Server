import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import cartValidationSchema from "./cart.validation";
import { CartController } from "./cart.controller";
import auth from "../../middlewares/auth";

const cartRouter = Router();

cartRouter.post(
  "/",
  validateRequest(cartValidationSchema),
  CartController.addToCart
);
cartRouter.get("/:userId", auth(["User"]), CartController.getCartItemsByUser);
cartRouter.delete("/:userId", auth(["User"]), CartController.removeCartItems);

export default cartRouter;
