import { NextFunction, Request, Response, Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ListingValidation } from "./listing.validation";
import { ListingController } from "./listing.controller";
import { upload } from "../../utils/fileUpload";

const listingRouter = Router();

listingRouter.post(
  "/",
  upload.array("file", 12),
  (req: Request, res: Response, next: NextFunction) => {
    const body = req.body.data;
    req.body = JSON.parse(body);
    next();
  },
  validateRequest(ListingValidation.listingValidationSchema),
  ListingController.addProduct
);

listingRouter.get("/", ListingController.getAllProducts);
listingRouter.get("/user/:userId", ListingController.getAllProductsByUserId);

listingRouter.get("/:productId", ListingController.getSingleProduct);

listingRouter.put(
  "/:id",
  upload.array("file", 12),
  ListingController.updateProduct
);

listingRouter.delete("/:id", ListingController.deleteSpecificProduct);

export default listingRouter;
