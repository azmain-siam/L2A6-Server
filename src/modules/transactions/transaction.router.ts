import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { TransactionValidation } from "./transaction.validation";
import { TransactionController } from "./transaction.controller";

const transactionRouter = Router();

transactionRouter.post(
  "/",
  validateRequest(TransactionValidation.transactionValidationSchema),
  TransactionController.createTransaction
);

export default transactionRouter;
