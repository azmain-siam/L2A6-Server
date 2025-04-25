import { Router } from "express";
import { PurchaseController } from "./purchase.controller";
import auth from "../../middlewares/auth";

const purchaseRouter = Router();

purchaseRouter.get(
  "/:userId",
  auth(["User"]),
  PurchaseController.getPurchaseHistory
);

export default purchaseRouter;
