import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import cartValidationSchema from "./cart.validation";
import { CartController } from "./cart.controller";

const cartRouter = Router();

cartRouter.post(
  "/",
  validateRequest(cartValidationSchema),
  CartController.addToCart
);
cartRouter.get("/:userId", CartController.getCartItemsByUser);
cartRouter.delete("/:userId", CartController.removeCartItems);

export default cartRouter;
