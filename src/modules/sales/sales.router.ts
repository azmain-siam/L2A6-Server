import { Router } from "express";
import { SalesController } from "./sales.controller";

const salesRouter = Router();

salesRouter.get("/:userId", SalesController.getSalesHistory);

export default salesRouter;
