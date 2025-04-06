import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ProductValidation } from "./product.validation";
import { ProductController } from "./product.controller";

const productRouter = Router();

productRouter.post(
  "/",
  validateRequest(ProductValidation.productValidationSchema),
  ProductController.addProduct
);
productRouter.put("/:productId", ProductController.updateProduct);
productRouter.delete("/:productId", ProductController.deleteSpecificProduct);

export default productRouter;
