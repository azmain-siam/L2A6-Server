import { Router } from "express";
import { TransactionController } from "./transaction.controller";

const transactionRouter = Router();

transactionRouter.post(
  "/",
  // validateRequest(TransactionValidation.transactionValidationSchema),
  TransactionController.createTransaction
);

export default transactionRouter;
