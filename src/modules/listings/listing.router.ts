import { NextFunction, Request, Response, Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ListingValidation } from "./listing.validation";
import { ListingController } from "./listing.controller";
import { upload } from "../../utils/fileUpload";
import auth from "../../middlewares/auth";

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
listingRouter.get(
  "/user/:userId",
  auth(["User"]),
  ListingController.getAllProductsByUserId
);

listingRouter.get("/:productId", ListingController.getSingleProduct);

listingRouter.put(
  "/status/:productId",
  auth(["User"]),
  ListingController.updateProductStatus
);

listingRouter.put(
  "/:id",
  upload.array("file", 12),
  auth(["User"]),
  ListingController.updateProduct
);

listingRouter.delete(
  "/:id",
  auth(["User"]),
  ListingController.deleteSpecificProduct
);

export default listingRouter;
