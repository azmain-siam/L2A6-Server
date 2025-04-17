import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ListingValidation } from "./listing.validation";
import { ListingController } from "./listing.controller";
import { upload } from "../../utils/fileUpload";

const listingRouter = Router();

listingRouter.post(
  "/",
  upload.single("file"),
  validateRequest(ListingValidation.listingValidationSchema),
  ListingController.addProduct
);
listingRouter.put("/:id", ListingController.updateProduct);
listingRouter.delete("/:id", ListingController.deleteSpecificProduct);

export default listingRouter;
