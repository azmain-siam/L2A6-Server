import { Router } from "express";
import { PurchaseController } from "./purchase.controller";

const purchaseRouter = Router();

purchaseRouter.get("/:userId", PurchaseController.getPurchaseHistory);

export default purchaseRouter;
