import { Types } from "mongoose";
import { z } from "zod";

const transactionValidationSchema = z.object({
  buyerID: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid buyerID",
  }),
  sellerID: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid sellerID",
  }),
  itemID: z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid itemID",
  }),
  status: z.enum(["pending", "completed"]),
});

export const TransactionValidation = {
  transactionValidationSchema,
};
