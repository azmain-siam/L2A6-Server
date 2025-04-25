import { Router } from "express";
import { SalesController } from "./sales.controller";
import auth from "../../middlewares/auth";

const salesRouter = Router();

salesRouter.get("/:userId", auth(["User"]), SalesController.getSalesHistory);

export default salesRouter;
