import { Router } from "express";
import { TransactionController } from "./transaction.controller";
import auth from "../../middlewares/auth";

const transactionRouter = Router();

transactionRouter.post(
  "/",
  auth(["User"]),
  // validateRequest(TransactionValidation.transactionValidationSchema),
  TransactionController.createTransaction
);
transactionRouter.put(
  "/:transactionId",
  auth(["User"]),
  // validateRequest(TransactionValidation.transactionValidationSchema),
  TransactionController.completeTransaction
);

export default transactionRouter;
