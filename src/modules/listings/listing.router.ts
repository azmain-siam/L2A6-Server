import { NextFunction, Request, Response, Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ListingValidation } from "./listing.validation";
import { ListingController } from "./listing.controller";
import { upload } from "../../utils/fileUpload";

const listingRouter = Router();

listingRouter.post(
  "/",
  // upload.single("file"),
  upload.array("file", 12),
  (req: Request, res: Response, next: NextFunction) => {
    // console.log(req.files);
    const body = req.body.data;
    req.body = JSON.parse(body);
    next();
  },
  validateRequest(ListingValidation.listingValidationSchema),
  ListingController.addProduct
);
listingRouter.get("/", ListingController.getAllProducts);
listingRouter.put("/:id", ListingController.updateProduct);
listingRouter.delete("/:id", ListingController.deleteSpecificProduct);

export default listingRouter;
