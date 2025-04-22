import { Types } from "mongoose";
import { z } from "zod";

const cartValidationSchema = z.object({
  productId: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), "ProductId is not valid"),
  user: z
    .string()
    .refine((val) => Types.ObjectId.isValid(val), "UserId is not valid"),
});

export default cartValidationSchema;
